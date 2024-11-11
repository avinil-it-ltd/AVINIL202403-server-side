//src\app\controllers\headlineController.js

const Headline = require('../models/Headline');

// Get all headlines (admin view)
exports.getAllHeadlines = async (req, res) => {
    try {
        const headlines = await Headline.find().sort({ createdAt: -1 });
        res.json(headlines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all active headlines for public view (horizontal scroll)
exports.getActiveHeadlines = async (req, res) => {
    try {
        const activeHeadlines = await Headline.find({ isActive: true })
            .sort({ createdAt: -1 })
            .select('title content type startDate endDate'); // Select only necessary fields
        res.json(activeHeadlines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new headline
exports.createHeadline = async (req, res) => {
    try {
        const { title, content, type, startDate, endDate, isActive } = req.body;
        const headline = new Headline({ title, content, type, startDate, endDate, isActive });
        await headline.save();
        res.status(201).json(headline);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing headline
exports.updateHeadline = async (req, res) => {
    try {
        const headline = await Headline.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        if (!headline) {
            return res.status(404).json({ message: 'Headline not found' });
        }
        res.json(headline);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Toggle active status
exports.toggleHeadlineStatus = async (req, res) => {
    try {
        const headline = await Headline.findById(req.params.id);
        if (!headline) {
            return res.status(404).json({ message: 'Headline not found' });
        }
        headline.isActive = !headline.isActive;
        await headline.save();
        res.json({ message: `Headline ${headline.isActive ? 'activated' : 'deactivated'} successfully`, headline });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a headline
exports.deleteHeadline = async (req, res) => {
    try {
        const headline = await Headline.findById(req.params.id);
        if (!headline) {
            return res.status(404).json({ message: 'Headline not found' });
        }
        await headline.remove();
        res.json({ message: 'Headline deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific headline by ID
exports.getHeadlineById = async (req, res) => {
    try {
        const headline = await Headline.findById(req.params.id);
        if (!headline) {
            return res.status(404).json({ message: 'Headline not found' });
        }
        res.json(headline);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// src/app/controllers/headlineController.js

// exports.getAllHeadlines = async (req, res) => {
//     try {
//         const headlines = await Headline.find();
//         res.json(headlines);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.getActiveHeadlines = async (req, res) => {
    try {
        const activeHeadlines = await Headline.find({ isActive: true });
        res.json(activeHeadlines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Other controller functions...
