const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createWishlist,
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/wishlistController');

router.post('/', createWishlist);
router.get('/', auth, getWishlist);
router.post('/add', auth, addToWishlist);
router.delete('/:productId', auth, removeFromWishlist);

module.exports = router;