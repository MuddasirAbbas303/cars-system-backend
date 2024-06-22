const Car = require('../models/Car');

/**
 * Retrieves a paginated list of cars for a specific user.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {number} [page=1] - The page number for pagination. Default is 1.
 * @param {number} [limit=10] - The number of cars per page. Default is 10.
 * @returns {Object} An object containing the list of cars, count, page, and totalPages.
 * @throws Will throw an error if the user_id is not found.
 */
exports.getCars = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const count = await Car.countDocuments({ user_id: userId });
    const cars = await Car.find({ user_id: userId }).populate({ path: 'category_id', select: 'name'}).skip(skip).limit(limit);
    const carsData = { cars, count, page, totalPages: Math.ceil(count / limit) }
    return carsData;
};

/**
 * Adds a new car to the database for a specific user.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} color - The color of the car.
 * @param {string} make - The make of the car.
 * @param {string} model - The model of the car.
 * @param {string} category_id - The unique identifier of the car's category.
 * @param {string} registration_no - The registration number of the car.
 * @returns {Object} The newly created car document.
 * @throws Will throw an error if the user_id is not found.
 */
exports.addCar = async (userId, color, make, model, category_id, registration_no) => {
    const car = new Car({ color, make, model, category_id, registration_no, user_id: userId });
    await car.save();
    return car;
};

/**
 * Updates an existing car in the database for a specific user.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} carId - The unique identifier of the car.
 * @param {string} [color] - The new color of the car. If not provided, the existing color will remain unchanged.
 * @param {string} [make] - The new make of the car. If not provided, the existing make will remain unchanged.
 * @param {string} [model] - The new model of the car. If not provided, the existing model will remain unchanged.
 * @param {string} [category_id] - The new unique identifier of the car's category. If not provided, the existing category_id will remain unchanged.
 * @param {string} [registration_no] - The new registration number of the car. If not provided, the existing registration_no will remain unchanged.
 * @returns {Object} The updated car document.
 * @throws Will throw an error if the car_id or user_id is not found.
 */
exports.updateCar = async (userId, carId, color, make, model, category_id, registration_no) => {
    let car = await Car.findOne({ _id: carId, user_id: userId });
    if (!car) {
        throw new Error('Car not found');
    }

    car.color = color || car.color;
    car.make = make || car.make;
    car.model = model || car.model;
    car.category_id = category_id || car.category_id;
    car.registration_no = registration_no || car.registration_no;
    await car.save();
    return car;
};

/**
 * Deletes a car from the database for a specific user.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} carId - The unique identifier of the car.
 * @returns {Object} The deleted car document.
 * @throws Will throw an error if the car_id or user_id is not found.
 */
exports.deleteCar = async (userId, carId) => {
    const car = await Car.findOneAndDelete({ _id: carId, user_id: userId });
    if (!car) {
        throw new Error('Car not found');
    }
    return car;
};;
