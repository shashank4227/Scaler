const db = require('./config/db');
require('dotenv').config();

const genericImages = {
    'Mobiles': [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
    ],
    'Fashion': [
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80'
    ],
    'Electronics': [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'
    ],
    'Home': [
        'https://images.unsplash.com/photo-1505691938895-1cd58ab32233?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583847661884-6e8d479e0084?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80'
    ],
    'Appliances': [
         'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
         'https://images.unsplash.com/photo-1593359677879-a4bb92f354d1?auto=format&fit=crop&w=600&q=80'
    ],
    'Grocery': [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=600&q=80'
    ]
};

const seedMissing = async () => {
    try {
        console.log('Filling missing images...');
        const [products] = await db.query(`
            SELECT p.id, p.title, c.name as category_name 
            FROM products p 
            JOIN categories c ON p.category_id = c.id
        `);
        
        const [existingImages] = await db.query('SELECT product_id FROM product_images');
        const imageCounts = existingImages.reduce((acc, img) => {
            acc[img.product_id] = (acc[img.product_id] || 0) + 1;
            return acc;
        }, {});

        for (const product of products) {
            const currentCount = imageCounts[product.id] || 0;
            if (currentCount < 3) {
                console.log(`Seeding for ${product.title} (${product.category_name})`);
                
                // Determine images based on category or title keywords
                let newImages = [];
                const cat = product.category_name;
                
                if (cat === 'Mobiles') newImages = genericImages.Mobiles;
                else if (cat === 'Fashion') newImages = genericImages.Fashion;
                else if (cat === 'Electronics') newImages = genericImages.Electronics;
                else if (cat === 'Home' || cat === 'Furniture') newImages = genericImages.Home;
                else if (cat === 'Appliances') newImages = genericImages.Appliances;
                else if (cat === 'Grocery') newImages = genericImages.Grocery;
                else newImages = genericImages.Electronics; // Default

                // Take slice to ensure we add enough
                const needed = 3 - currentCount;
                const toInsert = newImages.slice(0, needed);

                for (const url of toInsert) {
                    await db.query('INSERT INTO product_images (product_id, image_url) VALUES (?, ?)', [product.id, url]);
                }
            }
        }
        
        console.log('Seeding complete.');
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedMissing();
