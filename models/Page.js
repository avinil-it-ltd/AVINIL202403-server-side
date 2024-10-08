// models/Page.js
const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
