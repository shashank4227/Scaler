const db = require('./config/db');
require('dotenv').config();

const checkSchema = async () => {
    try {
        const [rows] = await db.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = 'defaultdb' 
            AND TABLE_NAME = 'products' 
            AND COLUMN_NAME = 'stock_quantity'
        `);
        
        if (rows.length > 0) {
            console.log('Column stock_quantity EXISTS.');
            const [data] = await db.query('SELECT id, title, stock_quantity FROM products LIMIT 3');
            console.log('Sample Data:', data);
        } else {
            console.log('Column stock_quantity DOES NOT EXIST.');
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkSchema();
