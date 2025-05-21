const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

const createWishlist = async (req, res) => {
    try {
        const { userId } = req.body;
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
            await wishlist.save();
        }

        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.userId }).populate('products');
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ user: req.user.userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user.userId, products: [] });
        }

        if (!wishlist.products.includes(product._id)) {
            wishlist.products.push(product._id);
            await wishlist.save();
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const wishlist = await Wishlist.findOne({ user: req.user.userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.products = wishlist.products.filter(p => !p.equals(product._id));
        await wishlist.save();

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createWishlist,
    getWishlist,
    addToWishlist,
    removeFromWishlist
};