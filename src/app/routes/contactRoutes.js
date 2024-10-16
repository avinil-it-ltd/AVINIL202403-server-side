// src/app/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController'); // Check this path

// Ensure these functions are defined in your contactController
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.post('/', contactController.createContact);
router.delete('/:id', contactController.deleteContact);
router.put('/:id/shortlisted', contactController.updateShortlisted); // New route

module.exports = router;
