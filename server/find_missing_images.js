const db = require('./config/db');
require('dotenv').config();

const checkMissing = async () => {
    try {
        const [products] = await db.query('SELECT id, title, category_id FROM products');
        const [images] = await db.query('SELECT product_id FROM product_images');

        const imageCounts = {};
        images.forEach(img => {
            imageCounts[img.product_id] = (imageCounts[img.product_id] || 0) + 1;
        });

        const missing = products.filter(p => !imageCounts[p.id] || imageCounts[p.id] < 3); // Less than 3 images?

        console.log(`Found ${missing.length} products with fewer than 3 gallery images.`);
        missing.forEach(p => console.log(`ID: ${p.id} | ${p.title} (Count: ${imageCounts[p.id] || 0})`));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkMissing();
