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
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
