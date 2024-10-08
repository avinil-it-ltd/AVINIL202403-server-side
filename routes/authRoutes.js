const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.put('/change-password', protect, changePassword);

module.exports = router;
