const carService = require('../services/carService');

/**
 * Retrieves a list of cars for the authenticated user.
 *
 * @param {Object} req - The request object containing query parameters for pagination.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {void}
 */
exports.getCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const result = await carService.getCars(req.user.userId, page, limit);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};;

/**
 * Adds a new car to the database for the authenticated user.
 *
 * @param {Object} req - The request object containing the car data in the request body.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the car data is invalid or if there is a database error.
 * 
 */
exports.addCar = async (req, res) => {
    try {
        const { color, make, model, category_id, registration_no } = req.body;
        const car = await carService.addCar(req.user.userId, color, make, model, category_id, registration_no);
        res.status(201).json(car);
    } catch (error) {
        res.status(500).send(error.message);
    }
};;

/**
 * Updates an existing car in the database for the authenticated user.
 *
 * @param {Object} req - The request object containing the car data in the request body and the car id in the params.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the car data is invalid or if there is a database error.
 * 
 */
exports.updateCar = async (req, res) => {
    try {
        const { color, make, model, category_id, registration_no } = req.body;
        const car = await carService.updateCar(req.user.userId, req.params.id, color, make, model, category_id, registration_no);
        res.json(car);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Deletes a car from the database for the authenticated user.
 *
 * @param {Object} req - The request object containing the car id in the params.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {void}
 *
 * @throws Will throw an error if there is a database error.
 * 
 */
exports.deleteCar = async (req, res) => {
    try {
        await carService.deleteCar(req.user.userId, req.params.id);
        res.json({ msg: 'Car removed' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
