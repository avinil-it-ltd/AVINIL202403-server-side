// controllers/PolicyController.js
const Policy = require('../models/Policy');

// Get all policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single policy by ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new policy
exports.createPolicy = async (req, res) => {
  const { title, content } = req.body;
  const policy = new Policy({
    title,
    content,
  });

  try {
    const newPolicy = await policy.save();
    res.status(201).json(newPolicy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing policy
exports.updatePolicy = async (req, res) => {
  try {
    const { title, content } = req.body;
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: 'Policy not found' });

    if (title) policy.title = title;
    if (content) policy.content = content;

    const updatedPolicy = await policy.save();
    res.json(updatedPolicy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a policy
exports.deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: 'Policy not found' });

    await policy.remove();
    res.json({ message: 'Policy deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
