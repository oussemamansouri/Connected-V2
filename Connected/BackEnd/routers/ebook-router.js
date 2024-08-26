const express = require('express'); // Import the Express framework
const route = express.Router(); // Create a new router instance
const db = require('../models'); // Import database models
const ebook_controller = require('../controllers/ebook-controller'); // Import the ebook controller
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

// Route to add a new ebook
route.post('/addebook/:CentreId', ebook_controller.upload, (req, res) => {
    // Add a new ebook using the provided data and file paths
    ebook_controller.addebook(
        req.body.titre, // Title of the ebook
        req.body.discription, // Description of the ebook
        req.body.auteur, // Author of the ebook
        req.body.format, // Format of the ebook
        req.body.nb_pages, // Number of pages in the ebook
        req.files['img'][0].path, // Path to the ebook image
        req.body.prix, // Price of the ebook
        req.body.promotion, // Promotion details for the ebook
        req.body.categorie, // Category of the ebook
        req.files['book'][0].path, // Path to the ebook file
        req.params.CentreId // Centre ID associated with the ebook
    )
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to update an existing ebook
route.patch('/updateebook/:id', ebook_controller.update, (req, res) => {
    const book = req.file ? req.file.path : req.body.oldPath; // Get the new book path if uploaded, otherwise use the old path

    // Update the ebook using the provided data
    ebook_controller.updateebook(
        req.body.titre, // Title of the ebook
        req.body.discription, // Description of the ebook
        req.body.auteur, // Author of the ebook
        req.body.format, // Format of the ebook
        req.body.nb_pages, // Number of pages in the ebook
        req.body.prix, // Price of the ebook
        req.body.promotion, // Promotion details for the ebook
        req.body.categorie, // Category of the ebook
        book, // Path to the ebook file
        req.params.id // ID of the ebook to be updated
    )
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to delete an existing ebook
route.delete('/deleteebook/:id', ebook_controller.Deleteebook);

// Route to get all ebooks
route.get('/ebooks', (req, res) => {
    db.Ebook.findAll({ include: [db.Centre] }) // Fetch all ebooks and include associated centre data
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to get a single ebook by ID
route.get('/ebook/:id', (req, res) => {
    db.Ebook.findOne({ where: { id: req.params.id } }) // Fetch ebook with the specified ID
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to get all ebooks for a specific centre
route.get('/centre/ebook/:CentreId', (req, res) => {
    db.Ebook.findAll({ where: { CentreId: req.params.CentreId } }) // Fetch ebooks for the specified centre ID
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

module.exports = route; // Export the router instance
