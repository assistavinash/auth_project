const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const register = async(req, res) => {
    try {
        const{ name, email, password } = req.body;
        const  user = await userModel.findOne({ email});
        if(user){
            return res.status(409)
            .json({message: "User already exists, you can login", success: false});
        }
        const newUser = new userModel({ name, email, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({message: "User registered successfully", success: true});
    } catch (error) {
        res.status(500).json({message: "Error in Registering user", success: false });
    }
 }


const login = async(req, res) => {
    try {
        const{ email, password } = req.body;
        const user = await userModel.findOne({ email});
        if(!user){
            return res.status(403)
            .json({message: "User not found", success: false});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(403)
            .json({message: "Invalid password", success: false});
        }

        const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({message: "Login successful", success: true, jwtToken, email, name:user.name });
    } catch (error) {
        res.status(500).json({message: "Error in Login", success: false });
    }
}

 module.exports = {
    register,
    login
};