// routes/testimonialRoutes.js
const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

router.get('/', testimonialController.getAllTestimonials);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
