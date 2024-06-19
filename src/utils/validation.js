const Joi = require("joi");

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

const validateCar = (req, res, next) => {
  try {

    const car = req.body;
    const schema = Joi.object({
      category_id: Joi.number().integer().required(),
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
