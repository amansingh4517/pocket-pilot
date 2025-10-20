import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res , next)=>{
    try {
        let token;

        // Check if token exists in headers
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            // Get token from header: "Bearer <token>"
            token= req.headers.authorization.split(' ')[1]; //separate Bearer and token and get only the token part
        }

        // Make sure token exists
        if(!token){
            return res.status(401).json({
                success : false,
                message : 'Not authorized to access this route'
            });
        }

        // Verify token
        const decoded = await jwt.verify(token , process.env.JWT_SECRET);

        // Get user from token (exclude password)
        req.user = await User.findById(decoded.id);

        if(!req.user){
            return res.status(401).json({
                success : false,
                message : 'No user found'
            });   
        }

        next(); // Continue to the next controller
    }
    catch (error) {
        return res.status(401).json({
            success : false,
            message : 'Not authorized to access this route'
        });
    }
};