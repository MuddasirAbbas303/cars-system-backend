const Category = require('../models/Category');

/**
 * Retrieves a list of categories for a given user.
 *
 * @param {string} userId - The ID of the user for whom to retrieve categories.
 * @returns {Promise<Category[]>} - A promise that resolves to an array of categories.
 */
exports.getCategories = async (userId) => {
    return await Category.find({ user_id: userId });
};;

/**
 * Adds a new category to the database for a given user.
 *
 * @param {string} userId - The ID of the user who will own the new category.
 * @param {string} name - The name of the new category.
 * @returns {Promise<Category>} - A promise that resolves to the newly created category.
 */
exports.addCategory = async (userId, name) => {
    const existingCategory = await Category.findOne({ name, user_id: userId });
    if (existingCategory) {
        throw new Error('Category already exists');
    }
    const category = new Category({ name, user_id: userId });
    await category.save();
    return category;
};

/**
 * Updates a category by its ID and user ID.
 *
 * @param {string} userId - The ID of the user who owns the category.
 * @param {string} categoryId - The ID of the category to update.
 * @param {string} name - The new name for the category. If not provided, the name remains unchanged.
 * @returns {Promise<Category>} - A promise that resolves to the updated category.
 * @throws {Error} - If the category is not found.
 */
exports.updateCategory = async (userId, categoryId, name) => {
    let category = await Category.findOne({ _id: categoryId, user_id: userId });
    if (!category) {
        throw new Error('Category not found');
    }

    category.name = name || category.name;
    await category.save();
    return category;
};

/**
 * Deletes a category by its ID and user ID.
 *
 * @param {string} userId - The ID of the user who owns the category.
 * @param {string} categoryId - The ID of the category to delete.
 * @returns {Promise<Category>} - A promise that resolves to the deleted category.
 * @throws {Error} - If the category is not found.
 */
exports.deleteCategory = async (userId, categoryId) => {
    const category = await Category.findOneAndDelete({ _id: categoryId, user_id: userId });
    if (!category) {
        throw new Error('Category not found');
    }
    return category;
};;
