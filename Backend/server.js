const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
    try {
        // Fetch products 
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        // Return products
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/', (req, res) => {
    res.send('Express backend is up and running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
