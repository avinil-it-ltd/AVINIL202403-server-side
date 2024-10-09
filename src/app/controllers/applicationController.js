// controllers/applicationController.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resumes'); // Directory to store resumes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
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

// Create a new application with resume upload
// exports.createApplication = (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: err.message });
//         }

//         const { name, email, careerId } = req.body;
//         const resumePath = req.file ? req.file.path : null; // Get the file path if uploaded

//         try {
//             const application = new Application({
//                 name,
//                 email,
//                 careerId,
//                 resume: resumePath // Save resume file path
//             });

//             await application.save();
//             res.status(201).json(application);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     });
// };




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
