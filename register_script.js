const { connection } = require('./connect');
const bcrypt = require('bcrypt');

async function handleSubmit(formData) {
    console.log('Received form data in register_script:', formData); // Add logging to check form data
    const { name, email, password, dob } = formData;

    if (!name || !email || !password || !dob) {
        return ['All fields are required'];
    }

    try {
        // Check if the profile already exists
        const selectQuery = `SELECT * FROM taskProfile_info WHERE email = ?`;
        const [rows, fields] = await connection.execute(selectQuery, [email]);

        if (rows.length > 0) {
            return ['Profile already exists!'];
        }

        // Generate salt and hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Attempting to insert data:", name, email, hashedPassword, dob); // Logging data before inserting

        // Insert new user data into the database
        const insertQuery = `INSERT INTO taskProfile_info (name, email, password, dob) VALUES (?, ?, ?, ?)`;
        const result = await connection.execute(insertQuery, [name, email, hashedPassword, dob]);
        console.log("Insert result:", result); // Logging the result of the insert operation

        return null; 
    } catch (error) {
        console.error('SQL error or other error:', error);
        return ['An error occurred. Please try again later.', error.message]; // Enhanced error reporting
    }
}

module.exports = {
    handleSubmit,
};
