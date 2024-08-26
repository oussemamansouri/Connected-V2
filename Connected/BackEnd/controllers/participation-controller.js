// Import required modules
const Joi = require('joi'); // Joi for schema validation
const db = require('../models'); // Database models

// Define schema for validating participation data
const SchemaValidation = Joi.object({
    ClientId: Joi.number().integer().positive().required(), // Client ID must be a positive integer and is required
    FormationId: Joi.number().integer().positive().required() // Formation ID must be a positive integer and is required
});

// Function to handle participation logic
const participe = (ClientId, FormationId) => {
    return new Promise((resolve, reject) => {
        // Validate input data against the schema
        let validation = SchemaValidation.validate({ ClientId, FormationId });
        if (validation.error) {
            // Reject if validation fails with error message
            reject(validation.error.details[0].message);
        } else {
            // Check if the client is already participating in the formation
            db.Participation.count({ where: { ClientId: ClientId, FormationId: FormationId } })
                .then(doc => {
                    if (doc != 0) {
                        // Reject if client is already participating
                        reject("Le client participe déjà à cette formation");
                    } else {
                        // Create a new participation record if not already existing
                        db.Participation.create({
                            ClientId: ClientId,
                            FormationId: FormationId
                        })
                            .then((response) => resolve(response)) // Resolve with the response on success
                            .catch((err) => reject(err)); // Reject with error if creation fails
                    }
                })
                .catch((err) => reject(err)); // Reject if counting records fails
        }
    });
};

// Function to handle deletion of participation records
const Deleteparticipation = (req, res) => {
    // Extract client ID and formation ID from request parameters
    const clientid = req.params.clientid;
    const formationid = req.params.formationid;

    // Delete participation record matching the client ID and formation ID
    db.Participation.destroy({
        where: { ClientId: clientid, FormationId: formationid }
    })
        .then(num => {
            if (num == 1) {
                // Respond with success message if one record was deleted
                res.send({
                    message: "Participation was deleted successfully!"
                });
            } else {
                // Respond with a message if no record was found to delete
                res.send({
                    message: `Cannot delete participation with clientid=${clientid} and formationid=${formationid}. Maybe participation was not found!`
                });
            }
        })
        .catch(err => {
            // Respond with error message if deletion fails
            res.status(500).send({
                message: "Could not delete participation with clientid=" + clientid + " and formationid=" + formationid
            });
        });
};

// Export the functions for use in other modules
module.exports = {
    participe,
    Deleteparticipation
};
