const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', require('./routes/orderRoutes'));

// Health Check
app.get('/', (req, res) => {
  res.send('Flipkart Clone API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
