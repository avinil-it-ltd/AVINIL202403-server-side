const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    requirements: { type: String },
    location: { type: String },
    status: { type: Boolean, default: true }, // Active (true) or Inactive (false)
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', careerSchema);
