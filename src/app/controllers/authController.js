// src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function for standardized error responses
const handleError = (res, message, statusCode = 500) => {
    console.error(message);
    return res.status(statusCode).json({ message });
};
// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    console.log(req.body);

    if (!name || !email || !password || !phone || !role) {
        return handleError(res, 'All fields are required.', 400);
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handleError(res, 'User already exists', 400);
        }

        // Create a new user without hashing the password
        const newUser = new User({
            name,
            email,
            password, // Store raw password
            phone,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        handleError(res, 'Server error');
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('line 15 ', email); // Removed password from logs for security

    if (!email || !password) {
        return handleError(res, 'Email and password are required.', 400);
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return handleError(res, 'User not found', 400);
        }

        // Compare the provided password with the stored raw password
        const isMatch = (password === user.password);
        console.log('line 65 ', isMatch);
        console.log('line 66 ', password, '\n', user.password);
        
        if (!isMatch) {
            return handleError(res, 'Invalid credentials', 400);
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        handleError(res, 'Server error');
    }
};


// Update user credentials
exports.updateCredentials = async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return handleError(res, 'Name, email, and phone are required.', 400);
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return handleError(res, 'User not found', 404);
        }

        // Check if the new email is unique
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.id !== user.id) {
            return handleError(res, 'Email already in use by another account', 400);
        }

        // Only update fields that have changed
        user.name = name;
        user.email = email; // Ensure unique constraint is handled in your model
        user.phone = phone; // Update phone number
        await user.save();

        res.status(200).json({ message: 'Credentials updated successfully!' });
    } catch (error) {
        handleError(res, 'Server error');
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return handleError(res, 'Current and new passwords are required.', 400);
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return handleError(res, 'User not found', 404);
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return handleError(res, 'Current password is incorrect.', 400);
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt); // Hash the new password
        await user.save();

        res.status(200).json({ message: 'Password changed successfully!' });
    } catch (error) {
        handleError(res, 'Server error');
    }
};
