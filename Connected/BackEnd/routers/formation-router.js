const express = require('express'); // Import the Express framework
const route = express.Router(); // Create a new router instance
const db = require('../models'); // Import database models
const formation_controller = require('../controllers/formation-controller'); // Import the formation controller
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
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

// Route to add a new formation
route.post('/addformation/:CentreId', formation_controller.upload, (req, res) => {
    // Add a new formation using the provided data and file path
    formation_controller.addformation(
        req.body.titre, // Title of the formation
        req.body.discription, // Description of the formation
        req.file.path, // Path to the formation image
        req.body.date_debut, // Start date of the formation
        req.body.date_fin, // End date of the formation
        req.body.prix, // Price of the formation
        req.body.heures, // Number of hours of the formation
        req.body.promotion, // Promotion details for the formation
        req.body.categorie, // Category of the formation
        req.body.etat, // State of the formation
        req.body.diplome, // Diploma related to the formation
        req.body.certifiee, // Certification status of the formation
        req.params.CentreId // Centre ID associated with the formation
    )
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to update an existing formation
route.patch('/updateformation/:id', (req, res) => {
    // Update the formation using the provided data
    formation_controller.updateformation(
        req.body.titre, // Title of the formation
        req.body.discription, // Description of the formation
        req.body.date_debut, // Start date of the formation
        req.body.date_fin, // End date of the formation
        req.body.prix, // Price of the formation
        req.body.heures, // Number of hours of the formation
        req.body.promotion, // Promotion details for the formation
        req.body.categorie, // Category of the formation
        req.body.etat, // State of the formation
        req.body.diplome, // Diploma related to the formation
        req.body.certifiee, // Certification status of the formation
        req.params.id // ID of the formation to be updated
    )
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to update an existing formation's image
route.patch('/updateformationimage/:id', formation_controller.upload, (req, res) => {
    // Update the formation image using the provided file path
    formation_controller.updateimage(req.file.path, req.params.id)
      .then(response => res.status(200).json(response)) // Send success response
      .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to delete an existing formation
route.delete('/deleteformation/:id', formation_controller.DeleteFormation);

// Route to get all formations
route.get('/formations', (req, res) => {
    // Fetch all formations and include associated centre data
    db.Formation.findAll({ include: [db.Centre] })
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to get a single formation by ID
route.get('/formation/:id', (req, res) => {
    // Fetch formation with the specified ID and include associated centre data
    db.Formation.findOne({ where: { id: req.params.id }, include: [db.Centre] })
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to get all formations for a specific centre
route.get('/centre/formation/:CentreId', (req, res) => {
    // Fetch formations for the specified centre ID
    db.Formation.findAll({ where: { CentreId: req.params.CentreId } })
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

module.exports = route; // Export the router instance
