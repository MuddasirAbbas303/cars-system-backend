
const nodemailer = require('nodemailer');
const config = require('../configs/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});

/**
 * Sends a password email to the provided email address.
 *
 * @param {string} email - The email address to send the password to.
 * @param {string} password - The password to be included in the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 * @throws Will throw an error if the email fails to send.
 *
 */
exports.sendPasswordEmail = async (email, password) => {

    const mailOptions = {
        from: config.EMAIL_USER,
        to: email,
        subject: 'Account Created',
        text: `Your password is ${password}`
    };

    await transporter.sendMail(mailOptions);
}