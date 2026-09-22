const mongoose = require('mongoose');

// Define the ClientDetails Schema
const ClientDetailsSchema = new mongoose.Schema({
    name: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' }
}, { _id: false }); // Prevents creating an _id for embedded documents

// Define the Review Schema
const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, default: 5, min: 1, max: 5 },
    comment: { type: String, trim: true, default: 'Initial review' }
}, { _id: false }); // Prevents creating an _id for embedded documents

// Define the Project Schema
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
    client: { type: ClientDetailsSchema, default: () => ({ name: '', email: '', phone: '' }) }, // Optional client details
    review: { type: ReviewSchema, default: () => ({ rating: 5, comment: 'Initial review' }) },
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
    budget: { // Field for the project budget (optional text)
        type: String,
        required: false, // Optional
        default: '',
        trim: true
    },
    areaSize: { // Field for the project area size
        type: String,
        required: false,
        default: '',
        trim: true
    },
    status: { // New field for project status
        type: String,
        enum: ['pending', 'running', 'completed'], // Allowed values for status
        required: true, // Make status field required
        default: 'pending' // Default status is 'pending'
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model('Project', ProjectSchema);
