// models/SEO.js
const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
    pageId: { type: mongoose.Schema.Types.ObjectId, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SEO', seoSchema);
