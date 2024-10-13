const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const projectController = require('../controllers/projectController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Check the file field name and set the destination accordingly
        if (file.fieldname === 'images') {
            cb(null, 'src/app/uploads/projects/images'); // Directory for project images
        } else if (file.fieldname === 'clientLogo') {
            cb(null, 'src/app/uploads/projects/logos'); // Directory for client logos
        } else {
            cb(new Error('Invalid field name')); // Handle invalid field names
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Save with a timestamp to avoid name clashes
    }
});

const upload = multer({ storage: storage });

// Get all projects
router.get('/', (req, res) => {
    console.log("GET /api/projects");
    projectController.getAllProjects(req, res);
});

// Get project by ID
router.get('/:id', (req, res) => {
    console.log(`GET /api/projects/${req.params.id}`);
    projectController.getProjectById(req, res);
});

// Create a new project with file uploads
router.post('/', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'clientLogo' }]), (req, res) => {
    console.log("POST /api/projects", req.body);
    const projectData = {
        title: req.body.title,
        client: {
            name: req.body.clientName,
            address: req.body.clientAddress,
            area: req.body.clientArea,
            projectType: req.body.projectType,
            logo: req.files['clientLogo'][0].path // URL to the client's logo image
        },
        images: req.files['images'] ? req.files['images'].map(file => file.path) : [], // Array of project image URLs
        review: {
            clientName: req.body.clientReviewName,
            feedback: req.body.clientFeedback,
            position: req.body.clientPosition
        },
        descriptions: req.body.descriptions ? req.body.descriptions.split(',') : [], // Split by comma if multiple
        contactInfo: {
            phone: req.body.contactPhone,
            email: req.body.contactEmail,
            address: req.body.contactAddress
        },
        category: req.body.category
    };
    projectController.createProject(req, res, projectData);
});

// Update a project by ID
router.put('/:id', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'clientLogo' }]), (req, res) => {
    console.log(`PUT /api/projects/${req.params.id}`, req.body);
    const projectData = {
        title: req.body.title,
        client: {
            name: req.body.clientName,
            address: req.body.clientAddress,
            area: req.body.clientArea,
            projectType: req.body.projectType,
            logo: req.files['clientLogo'] ? req.files['clientLogo'][0].path : req.body.clientLogo // Use existing if not uploaded
        },
        images: req.files['images'] ? req.files['images'].map(file => file.path) : [], // Array of project image URLs
        review: {
            clientName: req.body.clientReviewName,
            feedback: req.body.clientFeedback,
            position: req.body.clientPosition
        },
        descriptions: req.body.descriptions ? req.body.descriptions.split(',') : [], // Split by comma if multiple
        contactInfo: {
            phone: req.body.contactPhone,
            email: req.body.contactEmail,
            address: req.body.contactAddress
        },
        category: req.body.category
    };
    projectController.updateProject(req, res, projectData);
});

// Delete a project by ID
router.delete('/:id', (req, res) => {
    console.log(`DELETE /api/projects/${req.params.id}`);
    projectController.deleteProject(req, res);
});

module.exports = router;
