// controllers/careerController.js
const Career = require('../models/Career');

exports.getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        res.json(careers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCareer = async (req, res) => {
    try {
        const { title, description, requirements, location } = req.body;
        const career = new Career({ title, description, requirements, location });
        await career.save();
        res.status(201).json(career);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCareer = async (req, res) => {
    try {
        const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.json(career);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        await career.remove();
        res.json({ message: 'Career deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
