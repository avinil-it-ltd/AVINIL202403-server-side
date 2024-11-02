// src/app/routes/authRoutes.js
const express = require('express');
const { login, updateCredentials, changePassword, register, getUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.put('/update-credentials', auth, updateCredentials);
router.put('/change-password', auth, changePassword);
router.get('/user', auth, getUser); // Add this line

module.exports = router;
