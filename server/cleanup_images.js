const db = require('./config/db');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const checkImages = async () => {
    try {
        console.log('Fetching all image URLs...');
        const [rows] = await db.query('SELECT id, image_url FROM product_images');
        const [products] = await db.query('SELECT id, image_url FROM products');
        
        const allImages = [
            ...rows.map(r => ({ table: 'product_images', id: r.id, url: r.image_url })),
            ...products.map(p => ({ table: 'products', id: p.id, url: p.image_url }))
        ];

        console.log(`Checking ${allImages.length} images...`);

        const badImages = [];

        for (const img of allImages) {
            try {
                // Some servers block HEAD, so use GET with small timeout
                const res = await fetch(img.url, { method: 'GET', timeout: 5000 });
                if (!res.ok) {
                    console.log(`[BAD] ${img.url} (Status: ${res.status})`);
                    badImages.push(img);
                } else {
                   // console.log(`[OK] ${img.url}`);
                }
            } catch (err) {
                console.log(`[ERROR] ${img.url} (${err.message})`);
                badImages.push(img);
            }
        }

        console.log(`\nFound ${badImages.length} bad images.`);
        
        if (badImages.length > 0) {
            console.log('Removing bad images from DB...');
            for (const bad of badImages) {
                if (bad.table === 'product_images') {
                    await db.query('DELETE FROM product_images WHERE id = ?', [bad.id]);
                    console.log(`Deleted product_image id ${bad.id}`);
                } else {
                    console.log(`SKIPPING deletion of main product image id ${bad.id} (Please replace manually)`);
                }
            }
        }
        
        console.log('Done.');
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkImages();
