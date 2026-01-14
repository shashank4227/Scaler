/**
 * Node.js script to start Aiven MySQL service using Aiven API
 * 
 * Prerequisites:
 * 1. Set environment variables in your .env file:
 *    - AIVEN_API_TOKEN: Your Aiven API token (get from https://console.aiven.io/account/api-tokens)
 *    - AIVEN_PROJECT: Your Aiven project name
 *    - AIVEN_SERVICE: Your service name (e.g., "mysql-38ea5d17-shashank4227-1249")
 * 
 * Note: Uses Node.js built-in https module, no additional packages needed
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const AIVEN_API_TOKEN = process.env.AIVEN_API_TOKEN || '';
const AIVEN_PROJECT = process.env.AIVEN_PROJECT || 'default';
const AIVEN_SERVICE = process.env.AIVEN_SERVICE || 'mysql-38ea5d17-shashank4227-1249';

if (!AIVEN_API_TOKEN) {
    console.error('❌ Error: AIVEN_API_TOKEN environment variable is not set!');
    console.error('   Get your API token from: https://console.aiven.io/account/api-tokens');
    console.error('   Add it to your .env file: AIVEN_API_TOKEN=your-token-here');
    process.exit(1);
}

const API_BASE = 'https://api.aiven.io/v1/project';

function makeRequest(method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(`${API_BASE}/${AIVEN_PROJECT}/service/${AIVEN_SERVICE}${endpoint}`);
        
        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: method,
            headers: {
                'Authorization': `aivenv1 ${AIVEN_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            const postData = JSON.stringify(data);
            options.headers['Content-Length'] = Buffer.byteLength(postData);
        }

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                try {
                    const jsonBody = JSON.parse(body);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(jsonBody);
                    } else {
                        reject(new Error(`API Error (${res.statusCode}): ${jsonBody.message || body}`));
                    }
                } catch (e) {
                    reject(new Error(`Parse Error: ${body}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

async function getServiceStatus() {
    try {
        const response = await makeRequest('GET', '');
        return response.service.state;
    } catch (error) {
        throw new Error(`Failed to get service status: ${error.message}`);
    }
}

async function startService() {
    try {
        const response = await makeRequest('POST', '/start');
        return response;
    } catch (error) {
        throw new Error(`Failed to start service: ${error.message}`);
    }
}

async function main() {
    console.log('Aiven Service Auto-Start Script\n');
    console.log(`Project: ${AIVEN_PROJECT}`);
    console.log(`Service: ${AIVEN_SERVICE}\n`);

    try {
        // Check current status
        console.log('Checking service status...');
        const status = await getServiceStatus();
        console.log(`Current status: ${status}\n`);

        if (status === 'RUNNING') {
            console.log('✅ Service is already RUNNING!');
            return;
        }

        if (status === 'PAUSED' || status === 'POWEROFF') {
            console.log(`⚠️  Service is ${status}. Starting service...`);
            await startService();
            console.log('✅ Start command sent successfully!');
            console.log('⏳ Service is starting (this may take 1-3 minutes)...\n');

            // Poll for RUNNING status
            let attempts = 0;
            const maxAttempts = 30; // 5 minutes (10 seconds * 30)
            
            while (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
                attempts++;
                
                const newStatus = await getServiceStatus();
                console.log(`   Status: ${newStatus} (attempt ${attempts}/${maxAttempts})...`);
                
                if (newStatus === 'RUNNING') {
                    console.log('\n✅ Service is now RUNNING!');
                    console.log('   You can now connect to your database.');
                    return;
                }
            }

            console.log('\n⚠️  Service is still starting after 5 minutes.');
            console.log('   Check Aiven dashboard for current status.');
        } else {
            console.log(`⚠️  Service is in state: ${status}`);
            console.log('   Cannot auto-start from this state. Check Aiven dashboard.');
        }
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.message.includes('401') || error.message.includes('403')) {
            console.error('   Authentication failed. Check your AIVEN_API_TOKEN.');
        }
        process.exit(1);
    }
}

main();
