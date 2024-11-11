
//src\app\models\Headline.js
const mongoose = require('mongoose');

const headlineSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Headline title
  content: { type: String, required: true }, // Detailed content
  type: { 
    type: String, 
    enum: ['offer', 'news', 'announcement', 'other'], 
    required: true 
  }, // Type of headline
  startDate: { type: Date, default: Date.now }, // When it starts
  endDate: { type: Date }, // Optional: When it ends
  isActive: { type: Boolean, default: true }, // Active/Deactive status
}, { timestamps: true });

module.exports = mongoose.model('Headline', headlineSchema);
