const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new order
router.post('/', async (req, res) => {
    const { user_id, items, total_amount, shipping_address } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No items in order' });
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Generate Order ID
        const orderId = 'OD' + Date.now() + Math.floor(Math.random() * 1000);

        // Insert Order
        await connection.query(
            'INSERT INTO orders (id, user_id, total_amount, shipping_address) VALUES (?, ?, ?, ?)',
            [orderId, user_id || 1, total_amount, JSON.stringify(shipping_address)]
        );

        // Insert Order Items
        const orderItemsValues = items.map(item => [
            orderId,
            item.product_id,
            item.quantity,
            item.price
        ]);

        await connection.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ?',
            [orderItemsValues]
        );

        // Update Stock
        for (const item of items) {
            await connection.query(
                'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
                [item.quantity, item.product_id]
            );
        }

        await connection.commit();

        res.status(201).json({ 
            message: 'Order created successfully', 
            orderId: orderId 
        });

    } catch (error) {
        await connection.rollback();
        console.error('Order creation failed:', error);
        res.status(500).json({ message: 'Order creation failed', error: error.message });
    } finally {
        connection.release();
    }
});

module.exports = router;
