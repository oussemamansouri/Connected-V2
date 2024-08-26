const express = require('express'); // Import Express framework
const route = express.Router(); // Create a new router instance
const db = require('../models'); // Import database models
const admin_controller = require('../controllers/admin-controller'); // Import the controller for handling admin routes
const jwt = require('jsonwebtoken'); // Import JSON Web Token library
require('dotenv').config(); // Load environment variables from a .env file

//////////////////////////////   verify token admin

// Middleware to verify if the request contains a valid token and if the role is 'admin'
verifytokenadmin = (req, res, next) => {
    let token = req.headers.authorization; // Extract token from request headers
    let role = req.headers.role; // Extract role from request headers

    // Check if token is missing or role is not 'admin'
    if (!token || role !== 'admin') {
        return res.status(400).json({ msg: 'access rejected....!!!!' });
    }
    
    try {
        // Verify the token using the private key from environment variables
        jwt.verify(token, process.env.PRIVATKEY);
        next(); // Proceed to the next middleware or route handler
    } catch (e) {
        // Handle invalid token errors
        res.status(400).json({ msg: e.message });
    }
}

///////////////////////////////////////   verify keys

// Load keys from environment variables
var key1 = process.env.KEY1;
var key2 = process.env.KEY2;

// Middleware to verify if the request contains the correct keys in query parameters
verifykey = (req, res, next) => {
    let pk = req.query.key1; // Extract key1 from query parameters
    let ck = req.query.key2; // Extract key2 from query parameters

    // Check if provided keys match the expected keys
    if (pk === key1 && ck === key2) {
        next(); // Proceed to the next middleware or route handler
    } else {
        // Handle incorrect keys
        res.status(400).json({ error: "you can't access this route because you don't send me the keys i need !!!" });
    }
}

////////////////////////////// Route handlers

// Route to handle admin registration with image upload
route.post('/register', admin_controller.upload, (req, res) => {
    admin_controller.register(req.body.username, req.body.password, req.body.tel, req.body.email, req.file.path)
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update admin profile information
route.patch('/updateprofile/:id', (req, res) => {
    admin_controller.updateprofile(req.body.username, req.body.tel, req.body.email, req.params.id)
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update admin profile image with image upload
route.patch('/updateimage/:id', admin_controller.upload, (req, res) => {
    admin_controller.updateimage(req.file.path, req.params.id)
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update admin password
route.patch('/updatepassword/:id', (req, res) => {
    admin_controller.updatepassword(
        req.body.oldPassword,
        req.body.newPassword,
        req.body.repeatPassword,
        req.params.id
    )
    .then(response => res.status(200).json(response)) // Send successful response
    .catch(err => res.status(400).json(err)); // Send error response
});

// Route to get admin profile information
route.get('/profile', (req, res) => {
    db.Admin.findOne() // Fetch the first admin record
        .then(response => res.status(200).json(response)) // Send successful response
        .catch((err) => res.status(400).json(err)); // Send error response
});

module.exports = route; // Export the router instance
