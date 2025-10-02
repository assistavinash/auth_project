const e = require('express');
const { ensureAuthenticated } = require('../middleware/auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('User Info:', req.user); // Log user info to verify authentication
    
    res.status(200).json([
        {
            name: "mobile",
            price: 20000
        },
        {
            name: "laptop",
            price: 50000
        },
        {name: "tv",
            price: 30000
        }
    ])
});

module.exports = router;