const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createCart,
    getCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
} = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
* @swagger
 * /cart:
 *   post:
 *     summary: Create a new cart (usually done automatically during user registration)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user who owns the cart
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Bad request - userId is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * */
router.post('/', createCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.get('/', auth, getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *                 default: 1
 *     responses:
 *       200:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid product ID or quantity
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/add', auth, addToCart);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Item removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Server error
 */
router.delete('/:productId', auth, removeFromCart);

/**
 * @swagger
 * /cart/{productId}:
 *   put:
 *     summary: Update item quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: New quantity
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Cart item quantity updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid quantity
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Server error
 */
router.put('/:productId', auth, updateCartItemQuantity);

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID this cart belongs to
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID
 *               quantity:
 *                 type: integer
 *                 description: Quantity of this product in cart
 *                 minimum: 1
 *               productDetails:
 *                 $ref: '#/components/schemas/Product'
 *         total:
 *           type: number
 *           description: Total price of all items in cart
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the cart was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the cart was last updated
 */

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const {
//     createCart,
//     getCart,
//     addToCart,
//     removeFromCart,
//     updateCartItemQuantity
// } = require('../controllers/cartController');

// router.post('/', createCart);
// router.get('/', auth, getCart);
// router.post('/add', auth, addToCart);
// router.delete('/:productId', auth, removeFromCart);
// router.put('/:productId', auth, updateCartItemQuantity);

// module.exports = router;