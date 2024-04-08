
const express = require('express');
const bodyParser = require('body-parser');
const registerScript = require('./loginJS/register_script');
const loginScript = require('./loginJS/login_script');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login_page.html');
});

// Form submission
app.post('/register', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
