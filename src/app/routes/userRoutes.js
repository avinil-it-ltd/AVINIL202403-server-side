// // routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // User routes
// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/', userController.getAllUsers); // Admin only
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser); // Admin only

// module.exports = router;
const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.put('/change-password', protect, changePassword);

module.exports = router;
