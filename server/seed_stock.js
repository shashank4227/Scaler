const db = require('./config/db');
require('dotenv').config();

const seedStock = async () => {
    try {
        console.log('Seeding stock quantities...');
        
        // set most to 50
        await db.query('UPDATE products SET stock_quantity = 50');

        // set iPhone 15 (id 1) to low stock
        await db.query('UPDATE products SET stock_quantity = 3 WHERE id = 1');
        console.log('Updated iPhone 15 to 3 stock');

        // set Samsung F14 (id 2) to out of stock
        await db.query('UPDATE products SET stock_quantity = 0 WHERE id = 2');
        console.log('Updated Samsung F14 to 0 stock');

        // set Pixel 7a (id 4) to 8 (borderline low)
        await db.query('UPDATE products SET stock_quantity = 8 WHERE id = 4');
        console.log('Updated Pixel 7a to 8 stock');

        console.log('Stock seeding complete.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

seedStock();
