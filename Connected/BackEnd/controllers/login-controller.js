// Import necessary modules
const db = require('../models'); // Database models
const bcrypt = require('bcrypt'); // bcrypt for password hashing and comparison
const jwt = require('jsonwebtoken'); // jwt for generating JSON Web Tokens
require('dotenv').config(); // dotenv for loading environment variables

// Retrieve the private key from environment variables
const PrivatKey = process.env.PRIVATKEY;

// Function to handle login for clients, centres, and admins
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        // Validate email and password
        if (!email) {
            reject("email est obligatoire"); // Reject if email is not provided
        } else if (!password) {
            reject("mot de passe est obligatoire"); // Reject if password is not provided
        } else {
            // Find the user (client, centre, or admin) in the database by email
            let client = db.Client.findOne({ where: { email: email } });
            let centre = db.Centre.findOne({ where: { email: email } });
            let admin = db.Admin.findOne({ where: { email: email } });

            // Wait for all three database queries to resolve
            Promise.all([client, centre, admin])
                .then(([client, centre, admin]) => {
                    // Check if none of the users were found
                    if (!client && !centre && !admin) {
                        reject("e-mail ou mot de passe non valide !"); // Reject if no user is found
                    } else {
                        // Handle client login
                        if (client != null) {
                            bcrypt.compare(password, client.password).then((same) => {
                                if (same) {
                                    // Generate a token for the client if the password matches
                                    let token = jwt.sign(
                                        {
                                            id: client.id,
                                            name: client.firstname,
                                            img: client.img,
                                            role: client.role
                                        },
                                        PrivatKey,
                                        { expiresIn: "8h" } // Token expires in 8 hours
                                    );
                                    resolve({ token }); // Resolve with the generated token
                                } else {
                                    reject("e-mail ou mot de passe non valide !"); // Reject if password doesn't match
                                }
                            });
                        } 
                        // Handle centre login
                        else if (centre != null) {
                            bcrypt.compare(password, centre.password).then((same) => {
                                if (same) {
                                    // Generate a token for the centre if the password matches
                                    let token = jwt.sign(
                                        {
                                            id: centre.id,
                                            name: centre.name,
                                            img: centre.img,
                                            role: centre.role
                                        },
                                        PrivatKey,
                                        { expiresIn: "8h" } // Token expires in 8 hours
                                    );
                                    resolve({ token }); // Resolve with the generated token
                                } else {
                                    reject("e-mail ou mot de passe non valide !"); // Reject if password doesn't match
                                }
                            });
                        } 
                        // Handle admin login
                        else if (admin != null) {
                            bcrypt.compare(password, admin.password).then((same) => {
                                if (same) {
                                    // Generate a token for the admin if the password matches
                                    let token = jwt.sign(
                                        {
                                            id: admin.id,
                                            name: admin.username,
                                            img: admin.img,
                                            role: admin.role,
                                        },
                                        PrivatKey,
                                        { expiresIn: "8h" } // Token expires in 8 hours
                                    );
                                    resolve({ token }); // Resolve with the generated token
                                } else {
                                    reject("e-mail ou mot de passe non valide !"); // Reject if password doesn't match
                                }
                            });
                        }
                    }
                })
                .catch((err) => reject(err)); // Catch any errors during the process and reject the promise
        }
    });
};
