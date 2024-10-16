// src/app/controllers/applicationController.js
const Application = require('../models/Application'); // Correct path

// Create a new application
const createApplication = async (req, res) => {
    try {
        const { name, email, phoneNumber, careerId, isShortlisted, photo } = req.body;

        // Create a new application object
        const applicationData = {
            name,
            email,
            phoneNumber,
            careerId,
            isShortlisted,
            resume: req.file ? req.file.path : null, // Store the resume path if uploaded
            photo // Assume photo URL is sent in the body
        };

        const application = new Application(applicationData);
        await application.save();
        res.status(201).json({ message: 'Application created successfully!', application });
    } catch (error) {
        res.status(500).json({ message: 'Error creating application', error: error.message });
    }
};


// Get all applications
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('careerId', 'title') // Populating the career title
            .exec();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
};



// Controller function to get filtered applications
const getFilteredApplications = async (req, res) => {
    const { careerId, searchTerm, showShortlisted } = req.query;

    try {
        const filter = {};

        // Filter by career if specified
        if (careerId) {
            filter.careerId = careerId;
        }

        // Fetch applications from the database with the filter
        const applications = await Application.find(filter)
            .populate('careerId', 'title') // Populate with career title if needed
            .exec();

        // Further filtering based on search term and shortlisted status
        const filteredApplications = applications.filter(application => {
            const matchesSearch = 
                application.name.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
                application.email.toLowerCase().includes(searchTerm?.toLowerCase() || '');
            const matchesShortlisted = showShortlisted ? application.isShortlisted : true;

            return matchesSearch && matchesShortlisted;
        });

        res.json(filteredApplications);
    } catch (error) {
        console.error('Error fetching filtered applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateShortlistStatus = async (req, res) => {
    const { id } = req.params; // Get the application ID from the request parameters
    const { isShortlisted } = req.body; // Get the new shortlist status from the request body

    try {
        const application = await Application.findByIdAndUpdate(
            id,
            { isShortlisted }, // Update the isShortlisted field
            { new: true } // Return the updated document
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Shortlist status updated successfully', application });
    } catch (error) {
        console.error('Error updating shortlist status:', error);
        res.status(500).json({ message: 'Failed to update shortlist status' });
    }
};














// Delete an application by ID
const deleteApplication = async (req, res) => {
    const { id } = req.params; // Extract the ID from the URL parameters

    try {
        const application = await Application.findByIdAndDelete(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ message: 'Failed to delete application' });
    }
};
module.exports = {
    createApplication,
    getApplications,
    deleteApplication,
    getFilteredApplications,
    updateShortlistStatus
};
