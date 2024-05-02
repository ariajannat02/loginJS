const { connection } = require('./connect');
const express = require('express');
const bodyParser = require('body-parser');
const registerScript = require('./register_script');
const loginScript = require('./login_script');
const { handleLogout } = require('./logout_script'); // Import the handleLogout function

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
    // Render the login page HTML or send a login form
    res.sendFile(__dirname + '/login_page.html');
});

// Handle registration form submission
app.post('/register', async (req, res) => {
    console.log('Received registration data:', req.body); // Add logging to check form data
    const formData = req.body;
    const errors = await registerScript.handleSubmit(formData);
    if (errors) {
        res.status(400).json({ errors });
    } else {
        // Redirect to login page upon successful registration
        res.redirect('/login');
    }
});


// Handle login form submission
app.post('/login', async (req, res) => {
    const formData = req.body;
    const errors = await loginScript.handleSubmit(formData);
    if (errors) {
        res.status(400).json({ errors });
    } else {
        res.status(200).send('Login successful');
    }
});

// Handle logout form submission
app.post('/logout', handleLogout); // Use the handleLogout function to handle logout requests

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
