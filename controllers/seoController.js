// controllers/seoController.js
const SEO = require('../models/SEO');

exports.getSEOSettingsForPage = async (req, res) => {
    try {
        const seo = await SEO.findOne({ pageId: req.params.pageId });
        if (!seo) {
            return res.status(404).json({ message: 'SEO settings not found' });
        }
        res.json(seo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSEOSettings = async (req, res) => {
    try {
        const seo = await SEO.findOneAndUpdate(
            { pageId: req.params.pageId },
            req.body,
            { new: true, upsert: true }
        );
        res.json(seo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
