// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String },  // Store the file path if you're implementing file upload
    careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
