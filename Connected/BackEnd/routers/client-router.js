const express = require('express'); // Import Express framework
const route = express.Router(); // Create a new router instance
const db = require('../models'); // Import database models
const client_controller = require('../controllers/client-controller'); // Import the controller for handling client routes
const jwt = require('jsonwebtoken'); // Import JSON Web Token library
require('dotenv').config(); // Load environment variables from a .env file
const path = require('path'); // Import path module for file path operations

//////////////////////////////   verify token client

// Middleware to verify if the request contains a valid token and if the role is 'client'
verifytokenclient = (req, res, next) => {
    let token = req.headers.authorization; // Extract token from request headers
    let role = req.headers.role; // Extract role from request headers

    // Check if token is missing or role is not 'client'
    if (!token || role !== 'client') {
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

/////////////////////////////////////// verify keys

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

// Route to handle client registration with image and CV upload
route.post('/register', client_controller.upload, (req, res) => {
    const defaultImg = 'public/images/default-image.jpg'; // Default image path
    let imgPath = defaultImg; // Initialize image path to default image
    if (req.files['img']) { // Check if image was uploaded
        imgPath = req.files['img'][0].path; // Update image path if file is uploaded
    }
    
    const defaultCv = 'public/images/default-cv-image.jpg'; // Default CV path
    let cvPath = defaultCv; // Initialize CV path to default CV
    if (req.files['cv']) { // Check if CV was uploaded
        cvPath = req.files['cv'][0].path; // Update CV path if file is uploaded
    }

    // Call the register method in the client controller
    client_controller.register(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
        imgPath,
        req.body.tel,
        req.body.dob,
        req.body.address,
        cvPath,
        req.body.portfolio,
        req.body.facebook,
        req.body.linkedin,
        req.body.instagram,
        req.body.twitter
    )
    .then(response => res.status(200).json(response)) // Send successful response
    .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update client password
route.patch('/updatepassword/:id', (req, res) => {
    client_controller.updatepassword(
        req.body.oldPassword,
        req.body.newPassword,
        req.body.repeatPassword,
        req.params.id
    )
    .then(response => res.status(200).json(response)) // Send successful response
    .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update client profile information
route.patch('/updateprofile/:id', (req, res) => {
    client_controller.updateprofile(
        req.body.firstname,
        req.body.lastname,
        req.body.dob,
        req.body.address,
        req.body.tel,
        req.body.portfolio,
        req.body.facebook,
        req.body.linkedin,
        req.body.instagram,
        req.body.twitter,
        req.params.id
    )
    .then(response => res.status(200).json(response)) // Send successful response
    .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update client profile image with image upload
route.patch('/updateimage/:id', client_controller.uploadimg, (req, res) => {
    client_controller.updateimage(req.file.path, req.params.id)
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update client CV with CV upload
route.patch('/updatecv/:id', client_controller.uploadcv, (req, res) => {
    client_controller.updatecv(req.file.path, req.params.id)
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to delete a client profile
route.delete('/deleteprofile/:id', client_controller.DeleteProfile);

// Route to get a list of all client profiles
route.get('/profiles', (req, res, next) => { 
    db.Client.findAll() // Fetch all client records
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to get a specific client profile by ID
route.get('/profile/:id', (req, res, next) => { 
    db.Client.findOne({ where: { id: req.params.id } }) // Fetch client record by ID
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

module.exports = route; // Export the router instance
