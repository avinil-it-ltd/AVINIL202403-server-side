// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model if necessary for additional validation

const auth = async (req, res, next) => {
    try {
        // Retrieve token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            console.log('Authorization token missing');
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token (usually { id: userId }) to req.user

        // Optional: Fetch user data for further validation if needed
        const user = await User.findById(decoded.id); // Confirm user exists in the database
        if (!user) {
            console.log('User not found for token');
            return res.status(401).json({ message: 'User not found' });
        }

        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Token validation failed:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;







// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Import User model for additional validation

// // Protect middleware: Ensures the user is authenticated
// const protect = async (req, res, next) => {
//     try {
//         // Retrieve token from Authorization header
//         const token = req.header('Authorization')?.replace('Bearer ', '');
//         if (!token) {
//             console.log('Authorization token missing');
//             return res.status(401).json({ message: 'No token, authorization denied' });
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach the decoded token (usually { id: userId }) to req.user

//         // Optional: Fetch user data for further validation if needed
//         const user = await User.findById(decoded.id); // Confirm user exists in the database
//         if (!user) {
//             console.log('User not found for token');
//             return res.status(401).json({ message: 'User not found' });
//         }

//         next(); // Move to the next middleware or route handler
//     } catch (error) {
//         console.error('Token validation failed:', error.message);
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// // Admin middleware: Checks if the user has an admin role
// const admin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         next(); // Proceed if user is an admin
//     } else {
//         res.status(403).json({ message: 'Not authorized as an admin' });
//     }
// };

// module.exports = { protect, admin };
