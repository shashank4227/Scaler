const db = require('./config/db');
require('dotenv').config();

const verify = async () => {
    try {
        console.log('Checking ...');
        const [rows] = await db.query('SELECT * FROM product_images WHERE product_id = 1');
        console.log('Count:', rows.length);
        console.log(rows);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

verify();
