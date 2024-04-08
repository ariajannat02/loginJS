//const { connection } = require('./connect');
const bcrypt = require('bcrypt');

async function handleSubmit(formData) {
    const { email, password } = formData;

    if (!email || !password) {
        return ['Email and password are required'];
    }

    try {
        // Check if the user exists
        const selectQuery = `SELECT * FROM taskProfile_info WHERE email = ?`;
        const [rows, fields] = await connection.execute(selectQuery, [email]);

        if (rows.length > 0) {
            const storedHashedPassword = rows[0].password;
            const storedSalt = rows[0].salt;

            if (await bcrypt.compare(password + storedSalt, storedHashedPassword)) {
                // Passwords match, login successful
                // Redirect to user page or do something else
                return null;
            } else {
                return ['Incorrect email or password'];
            }
        } else {
            return ['Incorrect email or password'];
        }
    } catch (error) {
        console.error('Error:', error);
        return ['An error occurred. Please try again later.'];
    }
}

module.exports = {
    handleSubmit,
};
