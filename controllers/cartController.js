const Cart = require('../models/Cart');
const Product = require('../models/Product');

const createCart = async (req, res) => {
    try {
        const { userId } = req.body;
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
            await cart.save();
        }

        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            cart = new Cart({ user: req.user.userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.equals(product._id));

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({ product: product._id, quantity: quantity || 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.product.equals(product._id));
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCartItemQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.product.equals(product._id));

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createCart,
    getCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
};