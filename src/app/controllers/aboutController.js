// src/controllers/aboutController.js

const About = require('../models/About.js');

// Get About Us Content
exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) {
            return res.status(404).json({ message: 'About Us content not found' });
        }
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update About Us Content
exports.updateAbout = async (req, res) => {
    const { profile, centralImage, whyChooseUs, statistics } = req.body;

    if (!whyChooseUs || whyChooseUs.length !== 6) {
        return res.status(400).json({ message: 'Why Choose Us must contain exactly 6 titles and descriptions.' });
    }

    try {
        let about = await About.findOne();

        if (!about) {
            // Create new if no existing content
            about = new About({ profile, centralImage, whyChooseUs, statistics });
        } else {
            // Update existing content
            about.profile = profile;
            about.centralImage = centralImage;
            about.whyChooseUs = whyChooseUs;
            about.statistics = statistics;
        }

        // Save and return updated content
        const updatedAbout = await about.save();
        res.status(200).json(updatedAbout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
