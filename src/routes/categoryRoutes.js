const express = require('express');
const { getAllCategories, addCategory, editCategory, removeCategory } = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateCategory } = require('../utils/validation');

const router = express.Router();

router.get('/', authenticateToken, getAllCategories);
router.post('/', authenticateToken, validateCategory, addCategory);
router.put('/:id', authenticateToken, validateCategory, editCategory);
router.delete('/:id', authenticateToken, removeCategory);

module.exports = router;
