const express = require('express');
const { getAllCars, addCar, editCar, removeCar } = require('../controllers/carController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateCar } = require('../utils/validation');

const router = express.Router();

router.get('/', authenticateToken, getAllCars);
router.post('/', authenticateToken, validateCar, addCar);
router.put('/:id', authenticateToken, validateCar, editCar);
router.delete('/:id', authenticateToken, removeCar);

module.exports = router;
