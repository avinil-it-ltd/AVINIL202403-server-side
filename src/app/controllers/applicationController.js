const Application = require('../models/Application'); // Correct path

// Create a new application
const createApplication = async (req, res) => {
    try {
        // Destructure the body of the request
        const { name, email, phoneNumber, careerId, resume, photo, description, linkedinProfile, portfolioLink, address } = req.body;

        // Validate required fields
        if (!name || !email || !phoneNumber || !careerId || !resume || !photo) {
            return res.status(400).json({ message: 'Name, email, phone number, career ID, resume, and photo are required' });
        }

        // Create a new application object
        const applicationData = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            careerId: req.body.careerId,
            description: req.body.description || '',
            resume: req.body.resume || '',
            resumePdfLink: req.body.resumePdfLink || '', // New field for PDF link
            photo: req.body.photo || '',
            linkedinProfile: req.body.linkedinProfile || '',
            portfolioLink: req.body.portfolioLink || '',
            address: req.body.address || '',
        };
        const application = new Application(applicationData);
        await application.save();
        

        res.status(201).json({ message: 'Application created successfully!', application });
    } catch (error) {
        console.error('Error creating application:', error); // Log the error for debugging
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
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
};

// Controller function to get filtered applications
const getFilteredApplications = async (req, res) => {
    const { careerId, searchTerm, showShortlisted } = req.query;

    try {
        const filter = {};

        // Filter by career ID if specified
        if (careerId) {
            filter.careerId = careerId;
        }

        // Fetch applications from the database with the filter
        const applications = await Application.find(filter)
            .populate('careerId', 'title') // Populate with career title
            .exec();

        // Further filtering based on search term and shortlist status
        const filteredApplications = applications.filter(application => {
            const matchesSearch =
                application.name.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
                application.email.toLowerCase().includes(searchTerm?.toLowerCase() || '');
            const matchesShortlisted = showShortlisted ? application.isShortlisted : true;

            return matchesSearch && matchesShortlisted;
        });

        res.status(200).json(filteredApplications);
    } catch (error) {
        console.error('Error fetching filtered applications:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update shortlist status for an application
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
        res.status(500).json({ message: 'Failed to update shortlist status', error: error.message });
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
        res.status(500).json({ message: 'Failed to delete application', error: error.message });
    }
};

module.exports = {
    createApplication,
    getApplications,
    getFilteredApplications,
    updateShortlistStatus,
    deleteApplication,
};
