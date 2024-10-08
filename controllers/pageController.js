// controllers/pageController.js
const Page = require('../models/Page');

// Get all pages
exports.getAllPages = async (req, res) => {
    try {
        const pages = await Page.find();
        res.json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get page by ID
exports.getPageById = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);
        if (!page) return res.status(404).json({ message: 'Page not found' });
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new page
exports.createPage = async (req, res) => {
    try {
        const { title, content } = req.body;
        const page = new Page({ title, content });
        await page.save();
        res.status(201).json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update page
exports.updatePage = async (req, res) => {
    try {
        const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete page
exports.deletePage = async (req, res) => {
    try {
        await Page.findByIdAndDelete(req.params.id);
        res.json({ message: 'Page deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
