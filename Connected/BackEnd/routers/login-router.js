const express = require('express'); // Import the Express framework
const route = express.Router(); // Create a new router instance
const login_controller = require('../controllers/login-controller'); // Import the login controller
require('dotenv').config(); // Load environment variables

//////////////////////////////   Verify token for centre de formation

// Middleware to verify if the token is valid and the role is 'centre'
verifytokencentre = (req, res, next) => {
    let token = req.headers.authorization; // Retrieve token from headers
    let role = req.headers.role; // Retrieve role from headers

    // Check if token exists and the role is 'centre'
    if (!token || role !== 'centre') {
        return res.status(400).json({ msg: 'Access rejected....!!!!' });
    }

    try {
        // Verify token using the private key
        jwt.verify(token, process.env.PRIVATKEY);
        next(); // Proceed to the next middleware or route handler
    } catch (e) {
        // Handle token verification errors
        res.status(400).json({ msg: e.message });
    }
}

///////////////////////////////////////   Verify keys

// Retrieve keys from environment variables
var key1 = process.env.KEY1;
var key2 = process.env.KEY2;

// Middleware to verify query keys
verifykey = (req, res, next) => {
    let pk = req.query.key1; // Retrieve key1 from query parameters
    let ck = req.query.key2; // Retrieve key2 from query parameters

    // Check if the provided keys match the environment keys
    if (pk === key1 && ck === key2) {
        next(); // Proceed to the next middleware or route handler
    } else {
        // Return error if keys don't match
        res.status(400).json({ error: "You can't access this route because you didn't provide the required keys!" });
    }
}

//////////////////////////////

// Route to handle user login
route.post('/login', (req, res) => {
    // Attempt to log in using the provided email and password
    login_controller.login(req.body.email, req.body.password)
    .then(token => res.status(200).json({ token: token })) // Send success response with token
    .catch(err => res.status(400).json(err)); // Handle errors
});

module.exports = route; // Export the router instance
