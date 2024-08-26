const express = require('express'); // Import the Express framework
const route = express.Router(); // Create a new router instance
const db = require('../models'); // Import the database models
const participation_controller = require('../controllers/participation-controller'); // Import the participation controller
const jwt = require('jsonwebtoken'); // Import the JSON Web Token library
require('dotenv').config(); // Load environment variables

//////////////////////////////   Verify token for admin

// Middleware to verify if the token is valid and the role is 'admin'
verifytokenadmin = (req, res, next) => {
    let token = req.headers.authorization; // Retrieve token from headers
    let role = req.headers.role; // Retrieve role from headers

    // Check if token exists and the role is 'admin'
    if (!token || role !== 'admin') {
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

// Route to handle participation in a formation
route.post('/participer', (req, res) => {
    participation_controller.participe(req.body.ClientId, req.body.FormationId)
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to delete a participation
route.delete('/deleteparticipation/:clientid/:formationid', participation_controller.Deleteparticipation);

// Route to get all participants for a specific formation
route.get('/participant/:FormationId', (req, res) => {
    db.Participation.findAndCountAll({
        where: { FormationId: req.params.FormationId }, // Filter by FormationId
        include: [db.Client] // Include client information
    })
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to get all participations for a specific client
route.get('/participation/:ClientId', (req, res) => {
    db.Participation.findAll({
        where: { ClientId: req.params.ClientId }, // Filter by ClientId
        include: [db.Formation] // Include formation information
    })
    .then(response => res.status(200).json(response)) // Send success response
    .catch(err => res.status(400).json(err)); // Handle errors
});

// Route to get all formations that a client participates in within a specific centre
route.get('/participation/:ClientId/:CentreId', async (req, res) => {
    const { ClientId, CentreId } = req.params; // Retrieve parameters from the request
    try {
        // Find all formations in a specific centre that the client is participating in
        const formations = await db.Formation.findAll({
            where: { CentreId: CentreId }, // Filter by CentreId
            include: [{
                model: db.Participation,
                where: { ClientId: ClientId } // Filter by ClientId within the included Participation model
            }]
        });

        res.status(200).json(formations); // Send success response with formations
    } catch (err) {
        res.status(400).json(err); // Handle errors
    }
});

module.exports = route; // Export the router instance
