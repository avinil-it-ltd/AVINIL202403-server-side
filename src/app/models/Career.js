const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    vacancy: { type: Number, required: true }, // Number of vacancies available
    salary: { type: String }, // Salary details, e.g., "Negotiable"
    location: { type: [String] }, // Job location(s) as a list of strings
    experienceRequired: { type: [String] }, // List of strings for experience requirements
    jobResponsibilities: { type: String }, // Detailed job responsibilities description
    employmentStatus: { type: String }, // e.g., "Full-time", "Part-time"
    educationRequired: { type: String }, // Education qualification details
    additionalRequirements: { type: [String] }, // List of strings for additional requirements
    compensationBenefits: { type: [String] }, // List of strings for compensation and benefits
    requirements: { type: [String] }, // List of specific job requirements
    ageRequirement: { type: String }, // Age requirement, e.g., "At least 25 years"
    description: { type: String }, // Detailed description of the career opportunity
    deadline: { type: Date }, // Application deadline
    status: { type: Boolean, default: true }, // Active (true) or Inactive (false)
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', careerSchema);
