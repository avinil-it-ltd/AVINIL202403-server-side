// src/app/routes/applicationRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/app/uploads/resumes'); // Set the directory for resumes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Append timestamp to filename
    }
});

const upload = multer({ storage });

// Route to create a new application
router.post('/', upload.single('resume'), applicationController.createApplication); // 'resume' is the name of the file input in the form

// Route to get all applications
router.get('/', applicationController.getApplications);
// DELETE application by ID
router.delete('/:id', applicationController.deleteApplication);
router.put('/shortlist/:id', applicationController.updateShortlistStatus); // Ensure this matches your axios call

router.get('/filtered', applicationController.getFilteredApplications);
module.exports = router;
