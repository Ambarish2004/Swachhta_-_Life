const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,             // Don't save session if it wasn't modified
    saveUninitialized: true,   // Save uninitialized sessions
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // Set session cookie lifetime (1 day)
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/miniproject')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    console.log("Session data in middleware:", req.session);
    if (!req.session.userId) {
        console.log("No session found, redirecting to login...");
        return res.redirect('/login');
    }
    next();
}

// Routes
app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('index');
});

app.get('/', (req, res) => {
    res.redirect('/signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { email, password, confirm } = req.body;

    if (password !== confirm) {
        return res.send('Passwords do not match');
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use, please try another one.');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
        const user = new User({ email, password: hashedPassword });
        await user.save();

        req.session.userId = user._id; // Store user ID in session
        console.log("User created:", user);
        console.log("Session after signup:", req.session);
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).send('Error signing up');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Debugging: Log user credentials
    console.log("Login attempt with email:", email, "and password:", password);

    const user = await User.findOne({ email }); // Find user by email
    if (user && await bcrypt.compare(password, user.password)) { // Compare hashed passwords
        req.session.userId = user._id; // Store user ID in session
        console.log("User found:", user);
        console.log("Session after login:", req.session);
        res.redirect('/dashboard');
    } else {
        console.error('Invalid login credentials:', { email, password });
        return res.status(400).send('Invalid login credentials');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
