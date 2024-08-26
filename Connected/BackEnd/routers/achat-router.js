const express = require('express'); // Import Express framework
const route = express.Router(); // Create a new router instance
const db = require('../models'); // Import database models
const achat_controller = require('../controllers/achat-controller'); // Import the controller for handling 'achat' routes
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

var key1 = process.env.KEY1; // Load key1 from environment variables
var key2 = process.env.KEY2; // Load key2 from environment variables

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

// Route to handle purchasing by client
route.post('/acheterclient', (req, res) => {
    achat_controller.acheterclient(req.body.ClientId, req.body.EbookId)
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to handle deleting a purchase
route.delete('/deleteachat/:clientid/:bookid', achat_controller.Deleteachat);

// Route to get all purchases for a specific ebook
route.get('/acheteur/:EbookId', (req, res) => {
    db.Achat.findAndCountAll({ where: { EbookId: req.params.EbookId }, include: [db.Client] })
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to get all purchases made by a specific client
route.get('/acheter/:ClientId', (req, res) => {
    db.Achat.findAll({ where: { ClientId: req.params.ClientId }, include: [db.Ebook] })
        .then(response => res.status(200).json(response)) // Send successful response
        .catch(err => res.status(400).json(err)); // Send error response
});

// Route to get ebooks purchased by a specific client from a specific centre
route.get('/achat/:ClientId/:CentreId', async (req, res) => {
    const { ClientId, CentreId } = req.params;
    try {
        const ebooks = await db.Ebook.findAll({
            where: {
                CentreId: CentreId
            },
            include: [{
                model: db.Achat,
                where: {
                    ClientId: ClientId
                }
            }]
        });

        res.status(200).json(ebooks); // Send successful response
    } catch (err) {
        res.status(400).json(err); // Send error response
    }
});

module.exports = route; // Export the router instance
