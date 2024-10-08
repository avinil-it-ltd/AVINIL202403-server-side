const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', (req, res) => {
    console.log("GET /api/projects"); // Add this line
    projectController.getAllProjects(req, res);
});

router.get('/:id', (req, res) => {
    console.log(`GET /api/projects/${req.params.id}`); // Add this line
    projectController.getProjectById(req, res);
});

router.post('/', (req, res) => {
    console.log("POST /api/projects", req.body); // Add this line
    projectController.createProject(req, res);
});

router.put('/:id', (req, res) => {
    console.log(`PUT /api/projects/${req.params.id}`, req.body); // Add this line
    projectController.updateProject(req, res);
});

router.delete('/:id', (req, res) => {
    console.log(`DELETE /api/projects/${req.params.id}`); // Add this line
    projectController.deleteProject(req, res);
});

module.exports = router;
