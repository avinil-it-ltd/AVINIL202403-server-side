const express = require('express');
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});
const upload = multer({ storage });

// Route to receive job applications
router.post('/', upload.single('resume'), async (req, res) => {
    const { name, email, careerId } = req.body;

    try {
        const newApplication = new Application({
            name,
            email,
            careerId,
            resume: req.file.path // Store the resume file path
        });
        
        await newApplication.save();
        return res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error saving application:', error);
        return res.status(500).json({ message: 'Failed to submit application. Please try again.' });
    }
});

// Route to get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find().populate('careerId', 'title'); // Populate career title
        return res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        return res.status(500).json({ message: 'Failed to fetch applications.' });
    }
});

module.exports = router;
