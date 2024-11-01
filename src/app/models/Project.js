const mongoose = require('mongoose');

// Define the ClientDetails Schema
const ClientDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, trim: true }
}, { _id: false }); // Prevents creating an _id for embedded documents

// Define the Review Schema
const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true } // Comment is now required
}, { _id: false }); // Prevents creating an _id for embedded documents

// Define the Project Schema
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
    client: { type: ClientDetailsSchema, required: true }, // Embed client details
    review: { type: ReviewSchema, required: true }, // Now required for each project
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    mainImage: { 
        type: String,  // A single string for storing the main image URL
        required: true, // Main image is required
        trim: true      // Trim any extra spaces
    },
    additionalImages: [{ // Array of additional images
        type: String,  // Storing additional image URLs
        trim: true     // Trim any extra spaces
    }],
    description: { // New field for the project description
        type: String,
        required: true, // Make the description field required
        trim: true      // Trim any extra spaces
    },
    address: { // New field for the project address
        type: String,
        required: true, // Make address field required
        trim: true      // Trim any extra spaces
    },
    budget: { // New field for the project budget
        type: String,
        required: true, // Make budget field required
        min: 0          // Ensure budget cannot be negative
    },
    areaSize: { // New field for the project budget
        type: String,
        required: true, // Make budget field required
        min: 0          // Ensure budget cannot be negative
    },
    status: { // New field for project status
        type: String,
        enum: ['pending', 'running', 'completed'], // Allowed values for status
        required: true, // Make status field required
        default: 'pending' // Default status is 'pending'
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model('Project', ProjectSchema);
