// controllers/faqController.js
const FAQ = require('../models/FAQ');

exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = new FAQ({ question, answer });
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        await faq.remove();
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
