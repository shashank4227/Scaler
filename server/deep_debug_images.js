const db = require('./config/db');
require('dotenv').config();
const fetch = require('node-fetch');

const debug = async () => {
    try {
        console.log('--- DB CHECK ---');
        const [rows] = await db.query('SELECT image_url FROM product_images WHERE product_id = 1');
        console.log(`DB has ${rows.length} additional images for Product 1`);
        rows.forEach(r => console.log('  DB Image:', r.image_url));

        console.log('\n--- API CHECK ---');
        const res = await fetch('http://localhost:5000/api/products/1');
        const data = await res.json();
        console.log('API returned images array length:', data.images ? data.images.length : 'undefined');
        if (data.images) {
            data.images.forEach(img => console.log('  API Image:', img));
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debug();
