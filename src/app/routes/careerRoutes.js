// routes/careerRoutes.js
const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// Fetch all careers or a specific career by ID
router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);

// Create a new career
router.post('/', careerController.createCareer);

// Update an existing career
router.put('/:id', careerController.updateCareer);

// Update the status of a career
router.patch('/status/:id', careerController.updateCareerStatus);

// Delete a career
router.delete('/:id', careerController.deleteCareer);

module.exports = router;
