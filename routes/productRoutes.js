const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getProductsByCategory,
    getCategories,
    fetchAndSaveProducts
} = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products/fetch-products:
 *   get:
 *     summary: Fetch products from FakeStoreAPI and save to database (run once)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched and saved successfully
 *       500:
 *         description: Server error
 */
router.get('/fetch-products', fetchAndSaveProducts);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/', getProducts);

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Server error
 */
router.get('/categories', getCategories);

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Product category
 *     responses:
 *       200:
 *         description: List of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/category/:category', getProductsByCategory);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the product
 *         title:
 *           type: string
 *           description: The product title
 *         price:
 *           type: number
 *           description: The product price
 *         description:
 *           type: string
 *           description: The product description
 *         category:
 *           type: string
 *           description: The product category
 *         image:
 *           type: string
 *           description: URL of the product image
 *         rating:
 *           type: object
 *           properties:
 *             rate:
 *               type: number
 *             count:
 *               type: integer
 */


// Fetch and save products from FakeStoreAPI (run once)
// router.get('/fetch-products', fetchAndSaveProducts);

// router.get('/', getProducts);
// router.get('/categories', getCategories);
// router.get('/category/:category', getProductsByCategory);
// router.get('/:id', getProductById);

module.exports = router;