const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        `);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        `, [req.params.id]);

        if (products.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const [images] = await db.query('SELECT image_url FROM product_images WHERE product_id = ?', [req.params.id]);
        
        const product = products[0];
        product.images = [product.image_url, ...images.map(img => img.image_url)]; // Combine main image with additional images

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;
