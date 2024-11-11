const express = require('express');
const router = express.Router();
const headlineController = require('../controllers/headlineController'); // Importing controller functions
// const auth= require('../middleware/authMiddleware'); // Import protect and admin middleware

// Public Route: Get active headlines (for horizontal scroll on the frontend)
router.get('/active', headlineController.getActiveHeadlines);

// Admin Routes (with protect and admin middleware)
router.get('/', headlineController.getAllHeadlines); // Using controller methods here
router.get('/:id', headlineController.getHeadlineById);
router.post('/', headlineController.createHeadline);
router.put('/:id', headlineController.updateHeadline);
router.patch('/:id/toggle-status', headlineController.toggleHeadlineStatus);
router.delete('/:id', headlineController.deleteHeadline);

module.exports = router;
