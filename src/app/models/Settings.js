// models/Settings.js
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    contactInfo: { type: String },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
