const Career = require('../models/Career'); // Import your Career model

// Controller to get all careers
exports.getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        console.log('Careers fetched successfully:', careers);
        res.status(200).json(careers);
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ message: 'Error fetching careers. Please try again later.' });
    }
};

// Controller to create a new career
exports.createCareer = async (req, res) => {
    try {
        const { title, description, requirements, location } = req.body;
        const career = new Career({ title, description, requirements, location });
        await career.save();
        console.log('Career created successfully:', career);
        res.status(201).json(career);
    } catch (error) {
        console.error('Error creating career:', error);
        res.status(500).json({ message: 'Error creating career. Please try again later.' });
    }
};

// Controller to update an existing career
exports.updateCareer = async (req, res) => {
    try {
        const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        console.log('Career updated successfully:', career);
        res.status(200).json(career);
    } catch (error) {
        console.error('Error updating career:', error);
        res.status(500).json({ message: 'Error updating career. Please try again later.' });
    }
};

// Controller to delete a career
exports.deleteCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        await career.remove();
        console.log('Career deleted successfully:', career._id);
        res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
        console.error('Error deleting career:', error);
        res.status(500).json({ message: 'Error deleting career. Please try again later.' });
    }
};
