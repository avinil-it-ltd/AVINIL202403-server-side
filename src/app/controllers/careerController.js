const Career = require('../models/Career'); // Import the Career model

// Controller to get all careers
exports.getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find().lean(); // Use lean for better performance
        res.status(200).json(careers);
        
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ message: 'Error fetching careers. Please try again later.' });
    }
};

// Controller to get a career by ID
exports.getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await Career.findById(id).lean(); // Use lean for better performance

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(200).json({
            message: 'Career retrieved successfully',
            career,
        });
    } catch (error) {
        console.error('Error fetching career:', error);
        res.status(500).json({ message: 'Error fetching career. Please try again later.' });
    }
};

// Controller to create a new career
exports.createCareer = async (req, res) => {
    try {
        const newCareer = new Career(req.body); // Directly use req.body

        const career = await newCareer.save();
        res.status(201).json({
            message: 'Career created successfully',
            career,
        });
    } catch (error) {
        console.error('Error creating career:', error);
        res.status(500).json({ message: 'Error creating career. Please try again later.' });
    }
};

// Controller to update an existing career
exports.updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const career = await Career.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true }).lean();

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(200).json({
            message: 'Career updated successfully',
            career,
        });
    } catch (error) {
        console.error('Error updating career:', error);
        res.status(500).json({ message: 'Error updating career. Please try again later.' });
    }
};

// Controller to update the status of a career
exports.updateCareerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const career = await Career.findByIdAndUpdate(id, { status }, { new: true }).lean();

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(200).json({
            message: 'Career status updated successfully',
            career,
        });
    } catch (error) {
        console.error('Error updating career status:', error);
        res.status(500).json({ message: 'Failed to update career status.' });
    }
};
exports.deleteCareer = async (req, res) => {
    try {
        const careerId = req.params.id;

        // Use findByIdAndDelete to find and delete the career in one step
        const result = await Career.findByIdAndDelete(careerId);

        if (!result) {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
        console.error('Error deleting career:', error);
        res.status(500).json({ message: 'Server error' });
    }
};