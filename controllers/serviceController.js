// controllers/serviceController.js
const Service = require('../models/Service');

// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new service
exports.createService = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const service = new Service({ title, description, imageUrl });
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update service
exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete service
exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
