// In the application model file (e.g., applicationModel.js)
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: String,
    email: String,
    resume: String,
    careerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
    },
    isShortlisted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    photo: {
        type: String, // URL for the uploaded photo
        required: true, // Optional: set to true if photo is mandatory
    },
    phoneNumber: {
        type: String, // Store phone number as a string
        required: true, // Optional: set to true if phone number is mandatory
    },
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
