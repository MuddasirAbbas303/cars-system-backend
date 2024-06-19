const { getCategories, createCategory, updateCategory, deleteCategory } = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const category = await createCategory(req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message, status: error.code });
    }
};

const editCategory = async (req, res) => {
    try {
        const category = await updateCategory(req.params.id, req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeCategory = async (req, res) => {
    try {
        const category = await deleteCategory(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCategories, addCategory, editCategory, removeCategory };
