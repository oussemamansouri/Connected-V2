// Import required modules and libraries
const Joi = require('joi'); // Library for data validation
const db = require('../models'); // Importing database models
const bcrypt = require('bcrypt'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for handling JSON Web Tokens
const multer = require('multer'); // Library for handling file uploads
const path = require('path'); // Node.js module for handling file paths
require('dotenv').config(); // Load environment variables from a .env file

// Joi schema for validating user registration data
const SchemaValidation = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(15).required(),
  lastname: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/)
    .required(),
  imgPath: Joi.string().allow(''), // Allow an empty string for image path
  tel: Joi.number().integer().required(),
  dob: Joi.date().less('now').required(), // Date of birth must be in the past
  address: Joi.string().regex(/^[\u0600-\u06FFa-zA-Z\s',-]+$/).required(),
  cv: Joi.string().allow(''), // Allow an empty string for CV path
  portfolio: Joi.string().allow(''),
  facebook: Joi.string().allow(''),
  linkedin: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  twitter: Joi.string().allow(''),
});

// Function to register a new user
const register = async (firstname, lastname, email, password, imgPath, tel, dob, address, cv, portfolio, facebook, linkedin, instagram, twitter) => {
  try {
    // Validate the input data against the Joi schema
    const validation = SchemaValidation.validate({
      firstname,
      lastname,
      email,
      password,
      imgPath,
      tel,
      dob,
      address,
      cv,
      portfolio,
      facebook,
      linkedin,
      instagram,
      twitter,
    });

    // If validation fails, throw an error with the validation message
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }

    // Check if the email is already used by another user
    const count = await db.Client.count({ where: { email } });
    if (count !== 0) {
      throw new Error('Ce email est déjà utilisé'); // Email is already used
    }

    // Hash the user's password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user record in the database
    const response = await db.Client.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      img: imgPath,
      tel,
      dob,
      address,
      cv,
      portfolio,
      facebook,
      linkedin,
      instagram,
      twitter,
      role: 'client', // Default role is set to 'client'
    });

    return response; // Return the created user record
  } catch (error) {
    throw error; // Throw any errors encountered during registration
  }
};

// Joi schema for validating profile updates
const SchemaValidation2 = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(15).required(),
  lastname: Joi.string().alphanum().min(2).max(15).required(),
  dob: Joi.date().less('now').required(),
  address: Joi.string().regex(/^[\u0600-\u06FFa-zA-Z\s',-]+$/).required(),
  tel: Joi.number().integer().required(),
  portfolio: Joi.string().allow(''),
  facebook: Joi.string().allow(''),
  linkedin: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  twitter: Joi.string().allow(''),
});

// Function to update a user's profile
const updateprofile = (firstname, lastname, dob, address, tel, portfolio, facebook, linkedin, instagram, twitter, id) => {
  return new Promise((resolve, reject) => {
    // Validate the input data against the Joi schema
    let validation = SchemaValidation2.validate({ firstname, lastname, dob, address, tel, portfolio, facebook, linkedin, instagram, twitter });

    // If validation fails, reject the promise with the validation message
    if (validation.error) {
      reject(validation.error.details[0].message);
    } else {
      // Update the user's profile in the database
      db.Client.update({
        firstname,
        lastname,
        dob,
        address,
        tel,
        portfolio,
        facebook,
        linkedin,
        instagram,
        twitter,
      }, { where: { id: id } })
        .then((response) => resolve(response)) // Resolve the promise with the update response
        .catch((err) => reject(err)); // Reject the promise if there's an error during the update
    }
  });
};

// Function to delete a user's profile
const DeleteProfile = (req, res) => {
  const id = req.params.id;

  // Delete the user record from the database
  db.Client.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profile was deleted successfully!" // Profile deletion successful
        });
      } else {
        res.send({
          message: `Cannot delete profile with id=${id}. Maybe profile was not found!` // Profile not found
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete profile with id=" + id // Error during deletion
      });
    });
};

// Joi schema for validating image updates
const SchemaValidationimage = Joi.object({
  img: Joi.string().required(), // Image URL must be provided
});

// Function to update a user's profile image
async function updateimage(img, id) {
  try {
    // Validate the input data against the Joi schema
    const validationResult = SchemaValidationimage.validate({ img });
    if (validationResult.error) {
      const errorDetails = validationResult.error.details[0];
      let errorMessage = '';

      // Set custom error messages for specific validation errors
      switch (errorDetails.context.key) {
        case 'img':
          errorMessage = 'Image URL is invalid';
          break;
        default:
          errorMessage = errorDetails.message;
      }

      throw new Error(errorMessage); // Throw an error with the custom message
    }

    // Update the user's profile image in the database
    const response = await db.Client.update({
      img: img
    }, { where: { id: id } });

    return response; // Return the update response
  } catch (err) {
    throw new Error(err); // Throw any errors encountered during the update
  }
}

// Joi schema for validating CV updates
const SchemaValidationcv = Joi.object({
  cv: Joi.string().required(), // CV URL must be provided
});

// Function to update a user's CV
async function updatecv(cv, id) {
  try {
    // Validate the input data against the Joi schema
    const validationResult = SchemaValidationcv.validate({ cv });
    if (validationResult.error) {
      const errorDetails = validationResult.error.details[0];
      let errorMessage = '';

      // Set custom error messages for specific validation errors
      switch (errorDetails.context.key) {
        case 'cv':
          errorMessage = 'CV URL is invalid';
          break;
        default:
          errorMessage = errorDetails.message;
      }

      throw new Error(errorMessage); // Throw an error with the custom message
    }

    // Update the user's CV in the database
    const response = await db.Client.update({
      cv: cv
    }, { where: { id: id } });

    return response; // Return the update response
  } catch (err) {
    throw new Error(err); // Throw any errors encountered during the update
  }
}

// Joi schema for validating password updates
const SchemaValidationpassword = Joi.object({
  oldPassword: Joi.string().min(8).required(), // Old password must be provided
  newPassword: Joi.string().min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/)
    .required(), // New password must meet complexity requirements
  repeatPassword: Joi.ref('newPassword'), // Repeat password must match the new password
});

// Function to update a user's password
const updatepassword = (oldPassword, newPassword, repeatPassword, id) => {
  return new Promise((resolve, reject) => {
    // Validate the input passwords using a Joi schema
    let validation = SchemaValidationpassword.validate({ oldPassword, newPassword, repeatPassword });
    
    // Reject the promise if validation fails
    if (validation.error) {
      reject(validation.error.details[0].message);
    }
    
    // Check if the new password is not empty
    if (!newPassword) {
      reject("Le mot de passe ne peut pas être vide");
    }
    // Check if the new password matches the repeated password
    else if (newPassword !== repeatPassword) {
      reject("Le nouveau mot de passe et le mot de passe répété ne correspondent pas");
    } 
    else {
      // Find the client in the database using the provided ID
      db.Client.findOne({ where: { id: id } })
        .then((client) => {
          // Reject if the client is not found
          if (!client) {
            reject("Client introuvable");
          } else {
            // Compare the old password with the stored password using bcrypt
            bcrypt.compare(oldPassword, client.password, (err, result) => {
              if (err) {
                reject(err); // Handle bcrypt comparison error
              } else if (!result) {
                reject("L’ancien mot de passe est incorrect"); // Reject if old password is incorrect
              } else {
                // Hash the new password using bcrypt
                bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                  if (err) {
                    reject(err); // Handle bcrypt hashing error
                  } else {
                    // Update the client's password in the database
                    db.Client.update(
                      { password: hashedPassword },
                      { where: { id: id } }
                    )
                      .then((response) => resolve(response)) // Resolve the promise if update is successful
                      .catch((err) => reject(err)); // Handle database update error
                  }
                });
              }
            });
          }
        })
        .catch((err) => reject(err)); // Handle database query error
    }
  });
};

// Multer configuration for handling file uploads

// Disk storage configuration for multer
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  // Set the filename for uploaded files
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Use the current timestamp to ensure unique filenames
  }
});

// General upload handler allowing multiple file types (images, documents)
const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx/; // Allowed file types
    const mimeType = fileTypes.test(file.mimetype); // Check MIME type
    const extname = fileTypes.test(path.extname(file.originalname)); // Check file extension

    if(mimeType && extname) {
      return cb(null, true); // Accept the file if it meets the criteria
    }
    cb('Give proper files format to upload'); // Reject the file if it doesn't meet the criteria
  }
}).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]); // Specify fields for image and CV uploads

// Specific upload handler for images
const uploadimg = multer({
  storage: storage,
  limits: { fileSize: '1000000' }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Allowed image file types
    const mimeType = fileTypes.test(file.mimetype); // Check MIME type
    const extname = fileTypes.test(path.extname(file.originalname)); // Check file extension

    if(mimeType && extname) {
      return cb(null, true); // Accept the file if it meets the criteria
    }
    cb('Give proper files format to upload'); // Reject the file if it doesn't meet the criteria
  }
}).single('img'); // Handle a single image upload

// Specific upload handler for CVs
const uploadcv = multer({
  storage: storage,
  limits: { fileSize: '10000000' }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx|rtf|txt|jpeg|jpg|png/; // Allowed CV file types
    const mimeType = fileTypes.test(file.mimetype); // Check MIME type
    const extname = fileTypes.test(path.extname(file.originalname)); // Check file extension

    if(mimeType && extname) {
      return cb(null, true); // Accept the file if it meets the criteria
    }
    cb('Give proper files format to upload'); // Reject the file if it doesn't meet the criteria
  }
}).single('cv'); // Handle a single CV upload

// Export the functions and multer configurations for use in other parts of the application
module.exports = {
  DeleteProfile,
  register,
  upload,
  updateprofile,
  updateimage,
  uploadimg,
  updatepassword,
  updatecv,
  uploadcv
}
