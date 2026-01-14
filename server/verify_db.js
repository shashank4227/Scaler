const db = require('./config/db');

const verify = async () => {
    try {
        const [rows] = await db.query('SELECT product_id, image_url FROM product_images WHERE product_id = 1');
        console.log('Product 1 Images Count:', rows.length);
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verify();
