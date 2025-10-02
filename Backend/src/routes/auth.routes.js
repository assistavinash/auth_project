const {registervalidation, loginValidation} = require('../middleware/authValidation');

const { register, login } = require('../controllers/authController');


const router = require('express').Router();
 

router.post('/login', loginValidation, login);

router.post('/register', registervalidation, register);

module.exports = router;