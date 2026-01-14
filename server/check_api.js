const fetch = require('node-fetch');

const check = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/products/1');
        const data = await res.json();
        console.log('Product 1 JSON:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err);
    }
};

check();
