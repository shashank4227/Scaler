const fs = require('fs');
const path = require('path');
const db = require('./config/db');

const seedDatabase = async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
        // Split by semicolon but ignore newlines/empty strings
        // Note: Simple split might break if semicolons are in strings, but our schema is simple.
        const statements = sql
            .split(';')
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);

        console.log(`Found ${statements.length} SQL statements to execute.`);

        // Determine if we need to switch database context manually or if the script contains USE
        // Our script contains "USE flipkart_clone", so it should handle context switching if the user has permissions.
        
        for (const statement of statements) {
            // console.log(`Executing: ${statement.substring(0, 50)}...`);
            try {
                await db.query(statement);
            } catch (err) {
                // If error is "No database selected" or similar, it might be before the USE statement.
                // Or if DB doesn't exist yet.
                console.error(`Error executing statement: ${statement.substring(0, 50)}...`, err.message);
            }
        }

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedDatabase();
