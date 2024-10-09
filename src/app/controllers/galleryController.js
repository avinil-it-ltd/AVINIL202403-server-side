// controllers/galleryController.js
const Gallery = require('../models/Gallery');

exports.getAllGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.find();
        res.json(galleryItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createGalleryItem = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const galleryItem = new Gallery({ title, description, imageUrl });
        await galleryItem.save();
        res.status(201).json(galleryItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }
        res.json(galleryItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }
        await galleryItem.remove();
        res.json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
