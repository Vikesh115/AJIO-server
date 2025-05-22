const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createWishlist,
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/wishlistController');

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: User wishlist management
 */

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Create a new wishlist (usually done automatically during user registration)
 *     tags: [Wishlist]
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
 *                 description: ID of the user who owns the wishlist
 *     responses:
 *       201:
 *         description: Wishlist created successfully
 *       400:
 *         description: Bad request - userId is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.post('/', createWishlist);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's wishlist data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Server error
 */
router.get('/', auth, getWishlist);

/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Add item to wishlist
 *     tags: [Wishlist]
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
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add
 *     responses:
 *       200:
 *         description: Item added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/add', auth, addToWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Remove item from wishlist
 *     tags: [Wishlist]
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
 *         description: Item removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in wishlist
 *       500:
 *         description: Server error
 */
router.delete('/:productId', auth, removeFromWishlist);

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID this wishlist belongs to
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID
 *               productDetails:
 *                 $ref: '#/components/schemas/Product'
 *               addedAt:
 *                 type: string
 *                 format: date-time
 *                 description: When the product was added to wishlist
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the wishlist was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the wishlist was last updated
 */

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const {
//     createWishlist,
//     getWishlist,
//     addToWishlist,
//     removeFromWishlist
// } = require('../controllers/wishlistController');

// router.post('/', createWishlist);
// router.get('/', auth, getWishlist);
// router.post('/add', auth, addToWishlist);
// router.delete('/:productId', auth, removeFromWishlist);

// module.exports = router;