// controllers/applicationController.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/app/uploads/resumes/'); // Directory to store resumes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /pdf/; // Only allow PDF files
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .pdf files are allowed!'));
        }
    }
}).single('resume');

// Get all applications
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('careerId', 'title');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get filtered applications
exports.getFilteredApplications = async (req, res) => {
    try {
        const filters = {};

        // Check for career ID filter
        if (req.query.careerId) {
            filters.careerId = req.query.careerId;
        }

        // Check for isShortlisted filter
        if (req.query.isShortlisted) {
            filters.isShortlisted = req.query.isShortlisted === 'true';
        }

        // Fetch applications from the database with the specified filters
        const applications = await Application.find(filters).populate('careerId', 'title');
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
};

// Create a new application
exports.createApplication = async (req, res) => {
    try {
        const { name, email, careerId } = req.body;
        const resume = req.file ? `/uploads/resumes/${req.file.filename}` : null; // Store file path
        const application = new Application({ name, email, careerId, resume });
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        await application.remove();
        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
