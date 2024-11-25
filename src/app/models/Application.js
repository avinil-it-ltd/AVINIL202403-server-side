// In the application model file (e.g., applicationModel.js)
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    resume: {
        type: String, // URL or file path for the resume
        required: true, // Set to true if resume is mandatory
    },
    careerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
        required: true, // Career must be linked
    },
    isShortlisted: {
        type: Boolean,
        default: false,
    },
    photo: {
        type: String, // URL for the uploaded photo
        required: true, // Set to true if photo is mandatory
    },
    phoneNumber: {
        type: String, // Store phone number as a string
        required: true,
    },
    description: {
        type: String, // Text field for additional details
        default: '', // Optional field, defaults to an empty string
    },
    linkedinProfile: {
        type: String, // URL for LinkedIn profile
        default: '', // Optional field
    },
    portfolioLink: {
        type: String, // URL for a portfolio or personal website
        default: '', // Optional field
    },
    address: {
        type: String, // Address of the applicant
        default: '', // Optional field
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
