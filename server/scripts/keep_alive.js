/**
 * Keep-Alive Script - Connects to database periodically to prevent Aiven from pausing
 * 
 * Aiven free tier pauses services after 7 days of inactivity.
 * This script connects to your database every 6 days to keep it active.
 * 
 * Run this as a background service or scheduled task.
 */

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const INTERVAL_DAYS = 6; // Connect every 6 days (before 7-day timeout)
const INTERVAL_MS = INTERVAL_DAYS * 24 * 60 * 60 * 1000;

const connectionParams = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'flipkart_clone',
    port: parseInt(process.env.DB_PORT) || 3306,
    ssl: {
        rejectUnauthorized: false
    }
};

async function keepAlive() {
    console.log(`[${new Date().toISOString()}] Attempting keep-alive connection...`);
    
    let connection;
    try {
        connection = await mysql.createConnection(connectionParams);
        
        // Simple query to verify connection
        const [results] = await connection.query('SELECT 1 as keep_alive, NOW() as timestamp');
        
        console.log(`✅ Keep-alive successful! Database is active.`);
        console.log(`   Timestamp: ${results[0].timestamp}`);
        
        await connection.end();
        return true;
    } catch (error) {
        console.error(`❌ Keep-alive failed: ${error.message}`);
        
        if (error.code === 'ENOTFOUND') {
            console.error('   ⚠️  Database appears to be paused. You may need to start it manually.');
            console.error('   Run: node scripts/start_aiven_service.js');
        }
        
        if (connection) {
            try {
                await connection.end();
            } catch (e) {
                // Ignore cleanup errors
            }
        }
        
        return false;
    }
}

// Run immediately
keepAlive();

// Then schedule periodic runs
setInterval(() => {
    keepAlive();
}, INTERVAL_MS);

console.log(`Keep-alive script started. Will check database every ${INTERVAL_DAYS} days.`);
console.log(`Next check: ${new Date(Date.now() + INTERVAL_MS).toISOString()}`);
console.log('Press Ctrl+C to stop.');

// Keep process alive
process.on('SIGINT', () => {
    console.log('\nKeep-alive script stopped.');
    process.exit(0);
});
