const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getProductsByCategory,
    getCategories,
    fetchAndSaveProducts
} = require('../controllers/productController');

// Fetch and save products from FakeStoreAPI (run once)
router.get('/fetch-products', fetchAndSaveProducts);

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

module.exports = router;