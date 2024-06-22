const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../configs/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});

/**
 * Registers a new user and sends a password to the user's email.
 *
 * @param {string} email - The email of the user to register.
 * @returns {Promise<User>} - A promise that resolves to the newly created user.
 * @throws {Error} - Throws an error if the user already exists.
 */
exports.signUp = async (email) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    const mailOptions = {
        from: config.EMAIL_USER,
        to: email,
        subject: 'Account Created',
        text: `Your password is ${password}`
    };
    await transporter.sendMail(mailOptions);
    return user;
};;

/**
 * Logs in a user and generates a JWT token.
 *
 * @param {string} email - The email of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @returns {Promise<string>} - A promise that resolves to the JWT token.
 * @throws {Error} - Throws an error if the user doesn't exist or the password is incorrect.
 */
exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User doesn\'t exists');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
