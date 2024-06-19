const { getCars, createCar, updateCar, deleteCar } = require('../models/carModel');

const getAllCars = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const cars = await getCars(offset, limit, page);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCar = async (req, res) => {

    try {
        const car = await createCar(req.body);
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editCar = async (req, res) => {
    try {
        const car = await updateCar(req.params.id, req.body);
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeCar = async (req, res) => {
    try {
        const car = await deleteCar(req.params.id);
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCars, addCar, editCar, removeCar };
