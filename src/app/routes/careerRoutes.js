// routes/careerRoutes.js
const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

router.get('/', careerController.getAllCareers);
router.post('/', careerController.createCareer);
router.put('/:id', careerController.updateCareer);
router.delete('/:id', careerController.deleteCareer);
// router.get('/api/careers', async (req, res) => {
//     try {
//         const careers = await Career.find();
//         console.log('Careers fetched successfully:', careers);
//         res.status(200).json(careers);
//     } catch (error) {
//         console.error('Error fetching careers:', error);
//         res.status(500).json({ message: 'Error fetching careers. Please try again later.' });
//     }
// });

module.exports = router;
