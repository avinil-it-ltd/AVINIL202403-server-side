// src/app/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController'); // Ensure the path is correct

// Define routes and associate them with the controller functions
router.get('/', projectController.getAllProjects);       // Retrieve all projects
router.post('/', projectController.createProject);       // Create a new project
router.get('/:id', projectController.getProjectById);   // Get a project by ID
router.put('/:id', projectController.updateProject);    // Update a project by ID
router.delete('/:id', projectController.deleteProject); // Delete a project by ID

module.exports = router; // Export the router to use in server.js
