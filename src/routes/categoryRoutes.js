const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateCategory } = require('../utils/validation');

router.get('/', authMiddleware, categoryController.getCategories);
router.post('/', authMiddleware, validateCategory, categoryController.addCategory);
router.put('/:id', authMiddleware, validateCategory, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;
