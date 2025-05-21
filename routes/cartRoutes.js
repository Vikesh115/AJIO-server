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

router.post('/', createCart);
router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.delete('/:productId', auth, removeFromCart);
router.put('/:productId', auth, updateCartItemQuantity);

module.exports = router;