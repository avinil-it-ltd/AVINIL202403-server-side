// src/app/controllers/contactController.js
const Contact = require('../models/Contact');

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a contact by ID
const getContactById = async (req, res) => {
    const { id } = req.params; // Get ID from request parameters
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        console.error("Error fetching contact by ID:", err);
        res.status(500).json({ message: 'Server error' });
    }
};


const updateShortlisted = async (req, res) => {
    const { id } = req.params;
    const { shortlisted } = req.body;

    try {
        const contact = await Contact.findByIdAndUpdate(id, { shortlisted }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.error("Error updating shortlisted status:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


const createContact = async (req, res) => {
    try {
        const { name, email, phoneNumber, message } = req.body; // Include phoneNumber
        const contact = new Contact({ name, email, phoneNumber, message }); // Ensure these match your schema
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    updateShortlisted,
};