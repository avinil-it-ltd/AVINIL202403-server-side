// routes/seoRoutes.js
const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');

router.get('/pages/:pageId', seoController.getSEOSettingsForPage);
router.put('/pages/:pageId', seoController.updateSEOSettings);

module.exports = router;
