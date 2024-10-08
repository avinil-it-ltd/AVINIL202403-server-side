// controllers/mediaController.js
const Media = require('../models/Media');
const path = require('path');
const fs = require('fs');

// Helper function to handle file uploads
const uploadFile = (file) => {
    const fileName = Date.now() + path.extname(file.name);
    const filePath = path.join(__dirname, '..', 'uploads', fileName);
    file.mv(filePath);
    return fileName;
};

exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.uploadMedia = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.files.file;
        const fileName = uploadFile(file);
        const media = new Media({
            fileName: fileName,
            fileType: file.mimetype,
            filePath: `/uploads/${fileName}`
        });
        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        // Remove file from filesystem
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', media.fileName));

        // Remove media record from database
        await media.remove();
        res.json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
