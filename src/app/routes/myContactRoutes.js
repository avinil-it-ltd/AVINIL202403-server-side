// src/app/routes/myContactRoutes.js
const express = require('express');
const { getContact, updateContact } = require('../controllers/myContactController');

const router = express.Router();

// Route to get contact details
router.get('/', getContact);

// Route to update contact details
router.put('/', updateContact);

module.exports = router;
