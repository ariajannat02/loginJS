const { connection } = require('./connect'); // Import the connection object from connect.js
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function handleSubmit(formData) {
    const { name, email, password, cpassword, dob } = formData;

    if (!name || !email || !password || !cpassword || !dob) {
        return ['All fields are required'];
    }
    if (password !== cpassword) {
        return ['Passwords do not match'];
    }

    try {
        // Check if the profile already exists
        const selectQuery = `SELECT * FROM taskProfile_info WHERE email = ? AND password = ?`;
        const [rows, fields] = await connection.execute(selectQuery, [email, password]);

        if (rows.length > 0) {
            return ['Profile already exists!'];
        }

        // Generate salt and hash the password
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password + salt, 10);

        // Insert new user data into the database
        const insertQuery = `INSERT INTO taskProfile_info (name, email, password, dob, salt) VALUES (?, ?, ?, ?, ?)`;
        await connection.execute(insertQuery, [name, email, hashedPassword, dob, salt]);

        return null; 
    } catch (error) {
        console.error('Error:', error);
        return ['An error occurred. Please try again later.'];
    }
}

module.exports = {
    handleSubmit,
};
