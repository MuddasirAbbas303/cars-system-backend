const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateCar } = require('../utils/validation');

router.get('/', authMiddleware, carController.getCars);
router.post('/', authMiddleware, validateCar, carController.addCar);
router.put('/:id', authMiddleware, carController.updateCar);
router.delete('/:id', authMiddleware, carController.deleteCar);

module.exports = router;
