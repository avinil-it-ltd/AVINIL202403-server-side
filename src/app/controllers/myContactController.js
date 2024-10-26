// src/controllers/myContactController.js
const myContact = require('../models/myContact');

// Get Contact Details
exports.getContact = async (req, res) => {
  try {
    const contact = await myContact.findOne(); // Fixed line
    if (!contact) return res.status(404).json({ message: 'Contact details not found' });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Contact Details
exports.updateContact = async (req, res) => {
  const { address, mobile, email, fbLink, whatsappLink, youtubeLink } = req.body;

  try {
    let contact = await myContact.findOne();
    if (!contact) {
      contact = new myContact({ address, mobile, email, fbLink, whatsappLink, youtubeLink });
    } else {
      contact.address = address;
      contact.mobile = mobile;
      contact.email = email;
      contact.fbLink = fbLink;
      contact.whatsappLink = whatsappLink;
      contact.youtubeLink = youtubeLink;
    }

    const updatedContact = await contact.save();
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
