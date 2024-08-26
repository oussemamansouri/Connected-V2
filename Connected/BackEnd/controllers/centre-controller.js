// Import necessary modules
const Joi = require('joi');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Joi schema for validating registration input
const SchemaValidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  img: Joi.string().allow(''), // Image URL is optional
  tel: Joi.number().integer().required(),
  site: Joi.string().allow(''), // Website URL is optional
  services: Joi.string().required(),
  fiscale: Joi.string().regex(/^[0-9]{8}$/).required(), // Fiscale number must be exactly 8 digits
  license: Joi.string().allow(''), // License is optional
  nom_manager: Joi.string().alphanum().min(2).max(15).required(),
  prenom_manager: Joi.string().alphanum().min(2).max(15).required(),
  tel_manager: Joi.number().integer().required(),
  localisation: Joi.string().required(),
  facebook: Joi.string().allow(''), // Social media fields are optional
  linkedin: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  twitter: Joi.string().allow(''),
});

// Function to register a new center
const register = async (name, email, password, img, tel, site, services, fiscale, license, nom_manager, prenom_manager, tel_manager, localisation, facebook, linkedin, instagram, twitter) => {
  try {
    // Validate input data using Joi schema
    const validatedData = await SchemaValidation.validateAsync({
      name, email, password, img, tel, site, services, fiscale, license,
      nom_manager, prenom_manager, tel_manager, localisation, facebook,
      linkedin, instagram, twitter
    });

    // Check if email already exists in the database
    const emailExists = await db.Centre.count({ where: { email: validatedData.email } });
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Create new center instance with hashed password
    const newCentre = await db.Centre.create({
      name: validatedData.name,
      email: validatedData.email,
      password: bcrypt.hashSync(validatedData.password, 10),
      img: validatedData.img,
      tel: validatedData.tel,
      site: validatedData.site,
      services: validatedData.services,
      fiscale: validatedData.fiscale,
      license: validatedData.license,
      nom_manager: validatedData.nom_manager,
      prenom_manager: validatedData.prenom_manager,
      tel_manager: validatedData.tel_manager,
      localisation: validatedData.localisation,
      facebook: validatedData.facebook,
      linkedin: validatedData.linkedin,
      instagram: validatedData.instagram,
      twitter: validatedData.twitter,
      role: 'centre' // Assign role as 'centre'
    });

    return newCentre;
  } catch (err) {
    throw err; // Throw error if validation or creation fails
  }
}

// Secret key for JWT
const PrivatKey = process.env.PRIVATKEY;

// Function to log in a center
const login = (email, password) => {
  return new Promise((resolve, reject) => {
    db.Centre.findOne({ where: { email: email } }).then(user => {
      if (!user) {
        reject("Invalid email or password!"); // If email not found
      } else {
        // Compare entered password with stored hashed password
        bcrypt.compare(password, user.password).then(same => {
          if (same) {
            // Generate JWT token with user info
            let token = jwt.sign({ id: user.id, name: user.name, role: "centre" }, PrivatKey, { expiresIn: "8h" });
            resolve(token);
          } else {
            reject("Invalid email or password!"); // If password doesn't match
          }
        });
      }
    });
  });
}

// Joi schema for validating profile updates
const SchemaValidation2 = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  tel: Joi.number().integer().required(),
  services: Joi.string().required(),
  fiscale: Joi.string().required(),
  nom_manager: Joi.string().alphanum().min(2).max(15).required(),
  prenom_manager: Joi.string().alphanum().min(2).max(15).required(),
  tel_manager: Joi.number().integer().required(),
  localisation: Joi.string().required(),
  license: Joi.string().allow(''), // License is optional
  site: Joi.string().allow(''), // Website URL is optional
  facebook: Joi.string().allow(''), // Social media fields are optional
  linkedin: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  twitter: Joi.string().allow(''),
});

// Function to update the profile of a center
const updateprofile = (name, tel, site, services, fiscale, license, nom_manager, prenom_manager, tel_manager, localisation, facebook, linkedin, instagram, twitter, id) => {
  return new Promise((resolve, reject) => {
    // Validate input data using Joi schema
    let validation = SchemaValidation2.validate({ name, tel, site, services, fiscale, license, nom_manager, prenom_manager, tel_manager, localisation, facebook, linkedin, instagram, twitter });
    if (validation.error) {
      reject(validation.error.details[0].message); // Reject if validation fails
    } else {
      // Update center profile in the database
      db.Centre.update({
        name: name,
        tel: tel,
        site: site,
        services: services,
        fiscale: fiscale,
        license: license,
        nom_manager: nom_manager,
        prenom_manager: prenom_manager,
        tel_manager: tel_manager,
        localisation: localisation,
        facebook: facebook,
        linkedin: linkedin,
        instagram: instagram,
        twitter: twitter
      }, { where: { id: id } })
        .then((response) => resolve(response))
        .catch((err) => reject(err)); // Reject if update fails
    }
  });
}

// Joi schema for validating password updates
const SchemaValidationpassword = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).required(),
  repeatPassword: Joi.ref('newPassword'),
});

// Function to update the password of a center
const updatepassword = (oldPassword, newPassword, repeatPassword, id) => {
  return new Promise((resolve, reject) => {
    // Validate input data using Joi schema
    let validation = SchemaValidationpassword.validate({ oldPassword, newPassword, repeatPassword });
    if (validation.error) {
      reject(validation.error.details[0].message); // Reject if validation fails
    } else if (newPassword !== repeatPassword) {
      reject("New password and repeated password do not match"); // Reject if passwords don't match
    } else {
      // Find the center by ID
      db.Centre.findOne({ where: { id: id } })
        .then((centre) => {
          if (!centre) {
            reject("Centre not found"); // Reject if center not found
          } else {
            // Compare old password with stored hashed password
            bcrypt.compare(oldPassword, centre.password, (err, result) => {
              if (err) {
                reject(err); // Reject if comparison fails
              } else if (!result) {
                reject("Old password is incorrect"); // Reject if old password is incorrect
              } else {
                // Hash and update new password
                bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                  if (err) {
                    reject(err); // Reject if hashing fails
                  } else {
                    db.Centre.update({ password: hashedPassword }, { where: { id: id } })
                      .then((response) => resolve(response))
                      .catch((err) => reject(err)); // Reject if update fails
                  }
                });
              }
            });
          }
        })
        .catch((err) => reject(err)); // Reject if finding center fails
    }
  });
}

///////////////////////////////////////////////////////

// Joi schema for validating image updates
const SchemaValidationimage = Joi.object({
  img: Joi.string().required(), // Image URL is required
});

// Function to update the image of a center
async function updateimage(img, id) {
  try {
    // Validate image data using Joi schema
    const validationResult = SchemaValidationimage.validate({ img });
    if (validationResult.error) {
      const errorDetails = validationResult.error.details[0];
      let errorMessage = '';

      switch (errorDetails.context.key) {
        case 'img':
          errorMessage = 'Image URL is invalid'; // Custom error message for invalid image URL
          break;
        default:
          errorMessage = errorDetails.message;
      }

      throw new Error(errorMessage);
    }

    // Update center image in the database
    const response = await db.Centre.update({ img: img }, { where: { id: id } });
    return response;
  } catch (error) {
    throw error; // Throw error if validation or update fails
  }
}


// Function to delete a profile based on the ID provided in the request parameters
const DeleteProfile = (req, res) => {
  const id = req.params.id;

  db.Centre.destroy({
      where: { id: id } // Delete the record where the ID matches
  })
  .then(num => {
      if (num == 1) { // If exactly one record was deleted
          res.send({
              message: "Profile was deleted successfully!"
          });
      } else { // If no records were deleted, possibly because the ID was not found
          res.send({
              message: `Cannot delete profile with id=${id}. Maybe profile was not found!`
          });
      }
  })
  .catch(err => {
      res.status(500).send({ // Handle any server errors
          message: "Could not delete profile with id=" + id
      });
  });
};

// Set up storage configuration for multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images'); // Set the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the file name to avoid conflicts
  }
});

// Configure multer for file uploads, including file size limits and file type validation
const upload = multer({
  storage: storage,
  limits: { fileSize: '10000000' }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|jfif/; // Allowed file types
      const mimeType = fileTypes.test(file.mimetype); // Check the file's MIME type
      const extname = fileTypes.test(path.extname(file.originalname)); // Check the file's extension

      if(mimeType && extname) {
          return cb(null, true); // Accept the file if both MIME type and extension are valid
      }
      cb('Give proper file format to upload'); // Reject the file if it doesn't match the allowed types
  }
}).single('img'); // Expect a single file with the field name 'img'

// Export the functions to be used in other parts of the application
module.exports = {
  DeleteProfile,
  updateprofile,
  register,
  login,
  upload,
  updatepassword,
  updateimage
}
