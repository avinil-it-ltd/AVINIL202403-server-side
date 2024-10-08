// routes/mediaRoutes.js
const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.get('/', mediaController.getAllMedia);
router.post('/upload', mediaController.uploadMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
