const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerSetup = require('./swagger');

dotenv.config();

const app = express();

// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server started successfully")
})

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

swaggerSetup(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));