// src/models/About.js

const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    profile: {
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        introduction: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String, // URL for the profile picture
            required: true,
        }
    },
    centralImage: { // New field for central image
        type: String, // URL for the central image
        required: true,
    },
    whyChooseUs: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String, // URL for the image associated with the "Why Choose Us" entry
                required: true,
            }
        }
    ],
    statistics: {
        projectsCompleted: {
            type: Number,
            required: true,
        },
        awardsReceived: {
            type: Number,
            required: true,
        },
        happyCustomers: {
            type: Number,
            required: true,
        },
        yearsInService: {
            type: Number,
            required: true,
        }
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Ensure whyChooseUs has exactly 6 items with title, description, and image
aboutSchema.pre('save', function (next) {
    if (this.whyChooseUs.length !== 6) {
        const err = new Error('Why Choose Us section must have exactly 6 entries with title, description, and image');
        return next(err);
    }
    next();
});

module.exports = mongoose.model('About', aboutSchema);
