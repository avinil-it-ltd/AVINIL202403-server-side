// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getAllContacts);
router.post('/', contactController.createContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
