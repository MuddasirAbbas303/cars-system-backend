const categoryService = require('../services/categoryService');

/**
 * Retrieves a list of categories for the authenticated user.
 *
 * @param {Object} req - The request object containing the user's ID.
 * @param {Object} res - The response object to send the categories.
 *
 * @returns {void}
 */
exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories(req.user.userId);
        res.json(categories);
    } catch (error) {
        res.status(500).send('Server error');
    }
};;

/**
 * Adds a new category for the authenticated user.
 *
 * @param {Object} req - The request object containing the user's ID and the category name in the request body.
 * @param {Object} res - The response object to send the created category.
 *
 * @returns {void}
 * 
 */
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await categoryService.addCategory(req.user.userId, name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};;

/**
 * Updates an existing category for the authenticated user.
 *
 * @param {Object} req - The request object containing the user's ID, category ID in the params, and the category name in the request body.
 * @param {Object} res - The response object to send the updated category.
 * 
 * @returns {void}
 *
 */
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await categoryService.updateCategory(req.user.userId, req.params.id, name);
        res.json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};;

/**
 * Deletes a category for the authenticated user.
 *
 * @param {Object} req - The request object containing the user's ID and the category ID in the params.
 * @param {Object} res - The response object to send a success message.
 *
 * @returns {void}
 * 
 */
exports.deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.user.userId, req.params.id);
        res.json({ msg: 'Category removed' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
