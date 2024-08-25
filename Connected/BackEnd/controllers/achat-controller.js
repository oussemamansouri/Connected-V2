const Joi = require('joi'); // Import Joi for schema validation
const db = require('../models'); // Import the database models

// Define a Joi schema for validating the input
const SchemaValidation1 = Joi.object({
    ClientId: Joi.number().integer().positive().required(), // Client ID must be a positive integer and is required
    EbookId: Joi.number().integer().positive().required()   // Ebook ID must be a positive integer and is required
});

// Function to handle the purchasing of an ebook by a client
const acheterclient = (ClientId, EbookId) => {
    return new Promise((resolve, reject) => {
        // Validate the input against the schema
        let validation = SchemaValidation1.validate({ ClientId, EbookId });
        if (validation.error) {
            // Reject the promise if validation fails
            reject(validation.error.details[0].message);
        } else {
            // Check if the client has already purchased the ebook
            db.Achat.count({ where: { ClientId: ClientId, EbookId: EbookId } })
                .then(doc => {
                    if (doc != 0) {
                        // Reject if the ebook has already been purchased by the client
                        reject("Le client achète déjà cet ebook");
                    } else {
                        // Create a new record in the 'Achat' table if not purchased yet
                        db.Achat.create({
                            ClientId: ClientId,
                            EbookId: EbookId
                        }).then(response => resolve(response))
                        .catch(err => reject(err));
                    }
                });
        }
    });
};

// Function to handle the deletion of an 'Achat' record
const Deleteachat = (req, res) => {
    // Extract client ID and book ID from request parameters
    const clientid = req.params.clientid;
    const bookid = req.params.bookid;

    // Attempt to delete the 'Achat' record matching the client and ebook IDs
    db.Achat.destroy({
        where: { ClientId: clientid, EbookId: bookid }
    })
    .then(num => {
        if (num == 1) {
            // Respond with success message if one record was deleted
            res.send({
                message: "achat was deleted successfully!"
            });
        } else {
            // Respond with error message if no record was found
            res.send({
                message: `Cannot delete achat with clientid=${clientid} and ebook=${bookid}. Maybe achat was not found!`
            });
        }
    })
    .catch(err => {
        // Respond with error message if something goes wrong
        res.status(500).send({
            message: "Could not delete achat with clientid=" + clientid
        });
    });
};

module.exports = {
    acheterclient,
    Deleteachat
};
