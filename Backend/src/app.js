const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cors = require('cors');

const app = express();

// ✅ Enable CORS first
app.use(cors({  credentials: true }));


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Then use routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

module.exports = app;
