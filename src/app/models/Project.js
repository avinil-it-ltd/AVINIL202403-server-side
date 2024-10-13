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
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model('Project', ProjectSchema);
