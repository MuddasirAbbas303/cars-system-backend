const Joi = require("joi");

/**
 * Validates the category data received in the request body.
 *
 * @param {Object} req - The request object containing the category data.
 * @param {Object} res - The response object to send back the validation result.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * 
 */
const validateCategory = (req, res, next) => {
  try {
    const category = req.body;
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(category);

    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

/**
 * Validates the car data received in the request body.
 *
 * @param {Object} req - The request object containing the car data.
 * @param {Object} res - The response object to send back the validation result.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * 
 * @returns {void} This function does not return any value.
 * 
 */
const validateCar = (req, res, next) => {
  try {
    const car = req.body;
    const schema = Joi.object({
      category_id: Joi.string().required(),
      color: Joi.string().min(3).required(),
      model: Joi.string().min(3).required(),
      make: Joi.string().min(3).required(),
      registration_no: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(car);

    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { validateCategory, validateCar };
