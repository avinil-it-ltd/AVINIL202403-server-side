// controllers/subscriberController.js
const Subscriber = require('../models/Subscriber');

exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).json(subscriber);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        await subscriber.remove();
        res.json({ message: 'Subscriber removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
