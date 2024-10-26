// src/routes/aboutRoutes.js

const express = require('express');
const { getAbout, updateAbout } = require('../controllers/aboutController');
const router = express.Router();

// GET request to fetch About Us content
router.get('/', getAbout);

// PUT request to update About Us content
router.put('/', updateAbout);

module.exports = router;
