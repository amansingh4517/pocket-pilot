import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// A function that generate JWT Token that can be used later when user logs in or signs up
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email }); //mongoose model method to find  a single data from the database
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Create user
        const user = await User.create({ //mongoose model method to create data from the mongoDB database
            name,
            email,
            password
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                token
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        //Check user exists (include password for comparison)
        const user = await User.findOne({ email }).select('+password');  //.select('+password') we set select : false by default Mongoose will not return the password field in queries unless you explicitly ask for it.
        if (!user) { //if user exist it will contain all data including password of user or (nothing = false)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // everything is fine so Generate token 
        const token = generateToken(user._id);

        res.status(200).json({
            success : true,
            message : 'User logged in successfully',
            data : {
                id : user._id,
                name : user.name,
                email : user.email,
                token
            }
        });
    }
    catch (error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private  (user must be logged in to access this route)
export const getMe = async (req, res)=> {
    try{
        const user = await User.findById(req.user.id);
        
        res.status(200).json({
            success : true,
            data : user
        });
    }
    catch (error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
};