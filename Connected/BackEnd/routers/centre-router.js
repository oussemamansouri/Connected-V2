const express = require('express'); // Import Express framework
const route = express.Router(); // Create a new router instance
const db = require('../models'); // Import database models
const centre_controller = require('../controllers/centre-controller'); // Import the controller for handling centre routes
const jwt = require('jsonwebtoken'); // Import JSON Web Token library
require('dotenv').config(); // Load environment variables from a .env file

//////////////////////////////   verify token centre de formation

// Middleware to verify if the request contains a valid token and if the role is 'centre'
verifytokencentre = (req, res, next) => {
    let token = req.headers.authorization; // Extract token from request headers
    let role = req.headers.role; // Extract role from request headers

    // Check if token is missing or role is not 'centre'
    if (!token || role !== 'centre') {
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

// Route to handle centre registration with image upload
route.post('/register', centre_controller.upload, (req, res) => {
    const defaultImg = 'public/images/default-image.jpg'; // Default image path
    let imgPath = defaultImg; // Initialize image path to default image
    if (req.file) {
        imgPath = req.file.path; // Update image path if file is uploaded
    }
  
    centre_controller.register(
        req.body.name,
        req.body.email,
        req.body.password,
        imgPath,
        req.body.tel,
        req.body.site,
        req.body.services,
        req.body.fiscale,
        req.body.license,
        req.body.nom_manager,
        req.body.prenom_manager,
        req.body.tel_manager,
        req.body.localisation,
        req.body.facebook,
        req.body.linkedin,
        req.body.instagram,
        req.body.twitter
    )
    .then(response => {
        console.log(response); // Log the response
        res.status(200).json(response); // Send successful response
    })
    .catch(err => {
        console.log(err); // Log the error
        res.status(400).json(err); // Send error response
    });
});

// Route to handle centre login and return token
route.post('/login', (req, res) => {
    centre_controller.login(req.body.email, req.body.password)
    .then(token => res.status(200).json({ token: token })) // Send successful response with token
    .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update centre profile information
route.patch('/updateprofile/:id', (req, res) => {
    centre_controller.updateprofile(
        req.body.name,
        req.body.tel,
        req.body.site,
        req.body.services,
        req.body.fiscale,
        req.body.license,
        req.body.nom_manager,
        req.body.prenom_manager,
        req.body.tel_manager,
        req.body.localisation,
        req.body.facebook,
        req.body.linkedin,
        req.body.instagram,
        req.body.twitter,
        req.params.id
    )
    .then(response => res.status(200).json(response)) // Send successful response
    .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update centre profile image with image upload
route.patch('/updateimage/:id', centre_controller.upload, (req, res) => {
    centre_controller.updateimage(req.file.path, req.params.id)
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to update centre password
route.patch('/updatepassword/:id', (req, res) => {
    centre_controller.updatepassword(
        req.body.oldPassword,
        req.body.newPassword,
        req.body.repeatPassword,
        req.params.id
    )
    .then(response => res.status(200).json(response)) // Send successful response
    .catch(err => res.status(400).json(err)); // Send error response
});

// Route to delete a centre profile
route.delete('/deleteprofile/:id', centre_controller.DeleteProfile);

// Route to get a list of all centre profiles
route.get('/profiles', (req, res, next) => { 
    db.Centre.findAll() // Fetch all centre records
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to get a specific centre profile by ID
route.get('/profile/:id', (req, res, next) => { 
    db.Centre.findOne({ where: { id: req.params.id } }) // Fetch centre record by ID
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

module.exports = route; // Export the router instance
