// routes/policyRoutes.js
const express = require('express');
const router = express.Router();
const PolicyController = require('../controllers/PolicyController');

// Route to get all policies
router.get('/', PolicyController.getAllPolicies);

// Route to get a specific policy by ID
router.get('/:id', PolicyController.getPolicyById);

// Route to create a new policy
router.post('/', PolicyController.createPolicy);

// Route to update a specific policy by ID
router.put('/:id', PolicyController.updatePolicy);

// Route to delete a specific policy by ID
router.delete('/:id', PolicyController.deletePolicy);

module.exports = router;
