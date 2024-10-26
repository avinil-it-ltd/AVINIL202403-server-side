const mongoose = require('mongoose');

const myContactSchema = new mongoose.Schema({
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  fbLink: { type: String },
  whatsappLink: { type: String },
  youtubeLink: { type: String },
});

// Use `mongoose.models.Contact` to avoid overwriting the model
const Contact = mongoose.models.myContactSchema || mongoose.model('myContact', myContactSchema);

module.exports = Contact;
