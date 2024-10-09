// routes/subscriberRoutes.js
const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

router.get('/', subscriberController.getAllSubscribers);
router.post('/', subscriberController.addSubscriber);
router.delete('/:id', subscriberController.deleteSubscriber);

module.exports = router;
