const authService = require('../services/authService');

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
exports.signUp = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.signUp(email);
        res.status(201).send('User created. Please check your email for password.');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};;

/**
 * Handles user login.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};;
