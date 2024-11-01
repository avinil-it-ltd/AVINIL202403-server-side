// const Project = require('../models/Project');

// // Create a new project
// exports.createProject = async (req, res) => {
//     try {
//         console.log('Received body:', req.body);

//         const {
//             title,
//             category,
//             subcategory,
//             client,
//             review,
//             startDate,
//             endDate,
//             description,
//             mainImage,
//             additionalImages,
//             address,
//             budget,
//             status // Add status to the destructured body
//         } = req.body;

//         if (!title || !client.name || !client.email || !address || !budget || !status) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         const newProject = new Project({
//             title,
//             category,
//             subcategory,
//             client: {
//                 name: client.name,
//                 email: client.email,
//                 phone: client.phone
//             },
//             review: review ? {
//                 rating: review.rating,
//                 comment: review.comment
//             } : null,
//             startDate,
//             endDate,
//             description,
//             mainImage,
//             additionalImages: additionalImages || [],
//             address, // Include address
//             budget, // Include budget
//             status // Include status
//         });

//         const savedProject = await newProject.save();

//         res.status(201).json({
//             message: 'Project created successfully',
//             project: savedProject
//         });
//     } catch (error) {
//         console.error('Mongoose Error:', error); // This will give more insight into the backend error
//         res.status(500).json({
//             message: 'Error creating project',
//             error: error.message
//         });
//     }
// };

// // Get all projects
// exports.getAllProjects = async (req, res) => {
//     try {
//         const projects = await Project.find();
//         res.status(200).json({
//             message: 'Projects retrieved successfully',
//             projects
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error retrieving projects',
//             error: error.message
//         });
//     }
// };

// // Get a project by ID
// exports.getProjectById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const project = await Project.findById(id);

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         res.status(200).json({
//             message: 'Project retrieved successfully',
//             project
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error retrieving project',
//             error: error.message
//         });
//     }
// };

// // Update a project by ID
// exports.updateProject = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedData = req.body;

//         // Fetch the existing project data
//         const existingProject = await Project.findById(id);
//         if (!existingProject) {
//             return res.status(404).json({ message: 'Project not found.' });
//         }

//         // Update fields individually
//         if (updatedData.title) existingProject.title = updatedData.title;
//         if (updatedData.category) existingProject.category = updatedData.category;
//         if (updatedData.subcategory) existingProject.subcategory = updatedData.subcategory;
//         if (updatedData.startDate) existingProject.startDate = updatedData.startDate;
//         if (updatedData.endDate) existingProject.endDate = updatedData.endDate;
//         if (updatedData.description) existingProject.description = updatedData.description;
//         if (updatedData.address) existingProject.address = updatedData.address; // Update address
//         if (updatedData.budget) existingProject.budget = updatedData.budget; // Update budget
//         if (updatedData.status) existingProject.status = updatedData.status; // Update status

//         // Handle main image
//         if (updatedData.deleteMainImage) {
//             existingProject.mainImage = ''; // Delete the main image
//         } else if (updatedData.mainImage) {
//             existingProject.mainImage = updatedData.mainImage; // Update with new main image
//         }

//         // Handle additional images
//         if (updatedData.additionalImages) {
//             existingProject.additionalImages = updatedData.additionalImages;
//         }

//         // Save the updated project
//         const updatedProject = await existingProject.save();

//         res.status(200).json({
//             message: 'Project updated successfully',
//             project: updatedProject
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating project', error: error.message });
//     }
// };

// // Delete a project by ID
// exports.deleteProject = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedProject = await Project.findByIdAndDelete(id);

//         if (!deletedProject) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         res.status(200).json({
//             message: 'Project deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error deleting project',
//             error: error.message
//         });
//     }
// };


// src/app/controllers/projectController.js

const Project = require('../models/Project');

// Retrieve all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            message: 'Projects retrieved successfully',
            projects
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects', error: error.message });
    }
};

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const {
            title,
            category,
            subcategory,
            client,
            review,
            startDate,
            endDate,
            description,
            mainImage,
            additionalImages,
            address,
            budget,
            areaSize,
            status
        } = req.body;

        if (!title || !client.name || !client.email || !address || !budget || !status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newProject = new Project({
            title,
            category,
            subcategory,
            client: { name: client.name, email: client.email, phone: client.phone },
            review: review ? { rating: review.rating, comment: review.comment } : null,
            startDate,
            endDate,
            description,
            mainImage,
            additionalImages: additionalImages || [],
            address,
            budget,
            areaSize,
            status
        });

        const savedProject = await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: savedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project retrieved successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving project', error: error.message });
    }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
};
