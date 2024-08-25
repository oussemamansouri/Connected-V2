const Joi = require('joi'); // Import Joi for schema validation
const db = require('../models'); // Import the database models
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token management
const multer = require('multer'); // Import multer for file uploading
const path = require('path'); // Import path for handling file paths
require('dotenv').config(); // Load environment variables from .env file

// Schema validation for registration
const SchemaValidation = Joi.object({
    username: Joi.string().alphanum().min(2).max(15).required(), // Username must be alphanumeric, 2-15 characters
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/), // Password must meet complexity requirements
    tel: Joi.number().integer().required(), // Telephone number must be an integer and is required
    email: Joi.string().email().required(), // Email must be a valid email address and is required
    img: Joi.string() // Image URL is optional
});

// Schema validation for profile update
const SchemaValidation2 = Joi.object({
    username: Joi.string().alphanum().min(2).max(15).required(), // Username must be alphanumeric, 2-15 characters
    tel: Joi.number().integer().required(), // Telephone number must be an integer and is required
    email: Joi.string().email().required() // Email must be a valid email address and is required
});

// Schema validation for password update
const SchemaValidationpassword = Joi.object({
    oldPassword: Joi.string().min(8).required(), // Old password must be at least 8 characters
    newPassword: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(), // New password must meet complexity requirements
    repeatPassword: Joi.ref('newPassword') // New password must match the repeat password
});

// Register a new admin
const register = (username, password, tel, email, img) => {
    return new Promise((resolve, reject) => {
        // Validate the registration input
        let { error } = SchemaValidation.validate({ username, password, tel, email, img });
        if (error) {
            reject(error.details[0].message);
        } else {
            // Check if the email is already in use
            db.Admin.count({ where: { email: email } })
                .then(doc => {
                    if (doc != 0) {
                        reject("This email is already in use.");
                    } else {
                        // Hash the password and create a new admin record
                        bcrypt.hash(password, 10)
                            .then(hashedPassword => {
                                db.Admin.create({
                                    username: username,
                                    password: hashedPassword,
                                    img: img,
                                    tel: tel,
                                    email: email,
                                    role: 'admin'
                                })
                                    .then((response) => resolve(response))
                                    .catch((err) => reject(err));
                            })
                            .catch((err) => reject(err));
                    }
                })
                .catch((err) => reject(err));
        }
    });
};

// Update admin password
const updatepassword = (oldPassword, newPassword, repeatPassword, id) => {
    return new Promise((resolve, reject) => {
        // Validate the password input
        let validation = SchemaValidationpassword.validate({ oldPassword, newPassword, repeatPassword });
        if (validation.error) {
            reject(validation.error.details[0].message);
        }
        if (!newPassword) {
            reject("Le mot de passe ne peut pas être vide");
        } else if (newPassword !== repeatPassword) {
            reject("Le nouveau mot de passe et le mot de passe répété ne correspondent pas");
        } else {
            // Find the admin and compare old password
            db.Admin.findOne({ where: { id: id } })
                .then((admin) => {
                    if (!admin) {
                        reject("Admin introuvable");
                    } else {
                        bcrypt.compare(oldPassword, admin.password, (err, result) => {
                            if (err) {
                                reject(err);
                            } else if (!result) {
                                reject("L’ancien mot de passe est incorrect");
                            } else {
                                // Hash new password and update it
                                bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        db.Admin.update(
                                            { password: hashedPassword },
                                            { where: { id: id } }
                                        )
                                            .then((response) => resolve(response))
                                            .catch((err) => reject(err));
                                    }
                                });
                            }
                        });
                    }
                })
                .catch((err) => reject(err));
        }
    });
};

// Update admin profile information
async function updateprofile(username, tel, email, id) {
    try {
        // Validate the profile update input
        const validationResult = SchemaValidation2.validate({ username, tel, email });
        if (validationResult.error) {
            const errorDetails = validationResult.error.details[0];
            let errorMessage = '';

            // Customize error messages based on the validation error
            switch (errorDetails.context.key) {
                case 'username':
                    errorMessage = 'Username must be between 3 and 30 characters long';
                    break;
                case 'tel':
                    errorMessage = 'Telephone number is invalid';
                    break;
                case 'email':
                    errorMessage = 'Email address is invalid';
                    break;
                default:
                    errorMessage = errorDetails.message;
            }

            throw new Error(errorMessage);
        }
        
        // Update the admin record
        const response = await db.Admin.update({
            username: username,
            tel: tel,
            email: email
        }, { where: { id: id } });

        return response;
    } catch (err) {
        throw new Error(err);
    }
}

// Schema validation for image update
const SchemaValidationimage = Joi.object({
    img: Joi.string().required() // Image URL must be provided
});

// Update admin profile image
async function updateimage(img, id) {
    try {
        // Validate the image input
        const validationResult = SchemaValidationimage.validate({ img });
        if (validationResult.error) {
            const errorDetails = validationResult.error.details[0];
            let errorMessage = '';

            // Customize error messages based on the validation error
            switch (errorDetails.context.key) {
                case 'img':
                    errorMessage = 'Image URL is invalid';
                    break;
                default:
                    errorMessage = errorDetails.message;
            }

            throw new Error(errorMessage);
        }
        
        // Update the admin record with the new image URL
        const response = await db.Admin.update({
            img: img
        }, { where: { id: id } });

        return response;
    } catch (err) {
        throw new Error(err);
    }
}

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Define the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Define the filename with timestamp
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
        const mimeType = fileTypes.test(file.mimetype);  
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true); // Accept the file
        }
        cb('Give proper file format to upload'); // Reject the file
    }
}).single('img'); // Single file upload with field name 'img'

module.exports = {
    upload,
    updateprofile,
    updatepassword,
    register,
    updateimage
};
