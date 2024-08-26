// Import required modules
const Joi = require('joi'); // Joi for schema validation
const db = require('../models'); // Database models
const multer = require('multer'); // Middleware for handling file uploads
const path = require('path'); // Path module for handling file paths
require('dotenv').config(); // Load environment variables from .env file

// Define schema for validating formation data when adding a new formation
const SchemaValidation = Joi.object({
    titre: Joi.string().min(2).max(30).required(), // Title must be a string between 2 and 30 characters
    discription: Joi.string().min(30).max(300).required(), // Description must be a string between 30 and 300 characters
    img: Joi.string().required(), // Image URL is required
    date_debut: Joi.date().greater('now').allow('').allow(null), // Start date must be a future date, can be empty or null
    date_fin: Joi.date().greater('now').allow('').allow(null), // End date must be a future date, can be empty or null
    prix: Joi.number().positive().max(9999999999).required(), // Price must be a positive number with a maximum value
    heures: Joi.number().integer().positive().max(99999).required(), // Hours must be a positive integer with a maximum value
    promotion: Joi.number().integer().max(100).required(), // Promotion percentage must be an integer with a maximum value of 100
    categorie: Joi.string().required(), // Category must be a string and is required
    etat: Joi.string().required(), // State must be a string and is required
    diplome: Joi.string().allow('').optional(), // Diploma can be an empty string or omitted
    certifiee: Joi.string().optional(), // Certification status can be omitted
    CentreId: Joi.number().integer().positive() // Centre ID must be a positive integer, can be omitted
});

// Function to handle adding a new formation
const addformation = (titre, discription, img, date_debut, date_fin, prix, heures, promotion, categorie, etat, diplome, certifiee, CentreId) => {
    return new Promise((resolve, reject) => {
        // Validate input data against the schema
        let validation = SchemaValidation.validate({ titre, discription, img, date_debut, date_fin, prix, heures, promotion, categorie, etat, diplome, certifiee, CentreId });
        if (validation.error) {
            // Reject if validation fails with error message
            reject(validation.error.details[0].message);
        } else {
            // Create a new formation record in the database
            db.Formation.create({
                titre: titre,
                discription: discription,
                img: img,
                date_debut: date_debut,
                date_fin: date_fin,
                prix: prix,
                heures: heures,
                promotion: promotion,
                categorie: categorie,
                etat: etat,
                diplome: diplome,
                certifiee: certifiee,
                CentreId: CentreId
            })
                .then((response) => resolve(response)) // Resolve with the response on success
                .catch((err) => reject(err)); // Reject with error if creation fails
        }
    });
};

// Define schema for validating formation data when updating an existing formation
const SchemaValidation2 = Joi.object({
    titre: Joi.string().min(2).max(30).required(), // Title must be a string between 2 and 30 characters
    discription: Joi.string().min(30).max(300).required(), // Description must be a string between 30 and 300 characters
    date_debut: Joi.date().allow('').allow(null), // Start date can be empty or null
    date_fin: Joi.date().greater('now').allow('').allow(null), // End date must be a future date, can be empty or null
    prix: Joi.number().positive().max(9999999999).required(), // Price must be a positive number with a maximum value
    heures: Joi.number().integer().positive().max(99999).required(), // Hours must be a positive integer with a maximum value
    promotion: Joi.number().integer().max(100).required(), // Promotion percentage must be an integer with a maximum value of 100
    categorie: Joi.string().required(), // Category must be a string and is required
    etat: Joi.string().required(), // State must be a string and is required
    diplome: Joi.string().allow('').optional(), // Diploma can be an empty string or omitted
    certifiee: Joi.string().optional(), // Certification status can be omitted
    id: Joi.number().integer().positive() // Formation ID must be a positive integer and is required
});

// Function to handle updating an existing formation
const updateformation = (titre, discription, date_debut, date_fin, prix, heures, promotion, categorie, etat, diplome, certifiee, id) => {
    return new Promise((resolve, reject) => {
        // Validate input data against the schema
        let validation = SchemaValidation2.validate({ titre, discription, date_debut, date_fin, prix, heures, promotion, categorie, etat, diplome, certifiee, id });
        if (validation.error) {
            // Reject if validation fails with error message
            reject(validation.error.details[0].message);
        } else {
            // Update the formation record in the database
            db.Formation.update({
                titre: titre,
                discription: discription,
                date_debut: date_debut,
                date_fin: date_fin,
                prix: prix,
                heures: heures,
                promotion: promotion,
                categorie: categorie,
                etat: etat,
                diplome: diplome,
                certifiee: certifiee,
            }, { where: { id: id } })
                .then((response) => resolve(response)) // Resolve with the response on success
                .catch((err) => reject(err)); // Reject with error if update fails
        }
    });
};

// Define schema for validating image update data
const SchemaValidationimage = Joi.object({
    img: Joi.string().required(), // Image URL must be a string and is required
});

// Function to handle updating the image of an existing formation
async function updateimage(img, id) {
    try {
        // Validate input data against the schema
        const validationResult = SchemaValidationimage.validate({ img });
        if (validationResult.error) {
            const errorDetails = validationResult.error.details[0];
            let errorMessage = '';

            // Customize error message based on validation context
            switch (errorDetails.context.key) {
                case 'img':
                    errorMessage = 'Image URL is invalid';
                    break;
                default:
                    errorMessage = errorDetails.message;
            }

            throw new Error(errorMessage);
        }

        // Update the image of the formation record in the database
        const response = await db.Formation.update({
            img: img
        }, { where: { id: id } });

        return response; // Return the response on success
    } catch (err) {
        throw new Error(err); // Throw error if update fails
    }
}

// Function to handle deletion of a formation record
const DeleteFormation = (req, res) => {
    // Extract formation ID from request parameters
    const id = req.params.id;

    // Delete the formation record from the database
    db.Formation.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                // Respond with success message if one record was deleted
                res.send({
                    message: "Formation was deleted successfully!"
                });
            } else {
                // Respond with a message if no record was found to delete
                res.send({
                    message: `Cannot delete formation with id=${id}. Maybe formation was not found!`
                });
            }
        })
        .catch(err => {
            // Respond with error message if deletion fails
            res.status(500).send({
                message: "Could not delete formation with id=" + id
            });
        });
};

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for file uploads
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // Set the filename for uploaded files
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Middleware to handle image file uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' }, // Set file size limit to 1MB
    fileFilter: (req, file, cb) => {
        // Define allowed file types for uploads
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            // Allow file if it matches allowed types
            return cb(null, true);
        }
        // Reject file if it does not match allowed types
        cb('Give proper file format to upload');
    }
}).single('img');

// Export functions for use in other modules
module.exports = {
    addformation,
    DeleteFormation,
    updateformation,
    upload,
    updateimage
};
