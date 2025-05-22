const Product = require('../models/Product');
const axios = require('axios');

const fetchAndSaveProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        await Product.deleteMany({});
        await Product.insertMany(products);

        res.json(products);
        console.log('Products fetched and saved successfully');
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    fetchAndSaveProducts,
    getProducts,
    getProductById,
    getProductsByCategory,
    getCategories
};