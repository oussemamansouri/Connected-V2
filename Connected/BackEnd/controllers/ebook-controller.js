// Importing required modules
const Joi = require('joi'); // Joi for data validation
const db = require('../models'); // Database models
const multer = require('multer'); // Multer for handling file uploads
const path = require('path'); // Path module for working with file paths
require('dotenv').config(); // dotenv for loading environment variables

// Joi schema for validating eBook data before adding it to the database
const SchemaValidation = Joi.object({
  titre: Joi.string().min(2).max(30).required(), // Title must be between 2 and 30 characters
  discription: Joi.string().min(30).max(300).required(), // Description must be between 30 and 300 characters
  auteur: Joi.string().pattern(/^[a-zA-Z\-\s]+$/).required(), // Author must contain only letters, hyphens, and spaces
  format: Joi.string().valid('pdf', 'doc', 'docx', 'ppt', 'pptx', 'epub', 'mobi').required(), // Format must be one of the specified values
  nb_pages: Joi.number().positive().integer().required(), // Number of pages must be a positive integer
  img: Joi.string().required().regex(/.(jpg|jpeg|png|gif)$/), // Image must be of valid format (jpg, jpeg, png, gif)
  prix: Joi.number().positive().max(9999999999).required(), // Price must be a positive number with a maximum value
  promotion: Joi.number().integer().max(100).required(), // Promotion must be an integer and represent a percentage (0-100)
  categorie: Joi.string().required(), // Category is required
  book: Joi.string().required().regex(/.(pdf|doc|docx|ppt|epub|pptx|mobi)$/) // Book file must be of valid format
});

// Function to add a new eBook to the database
const addebook = (titre, discription, auteur, format, nb_pages, img, prix, promotion, categorie, book, CentreId) => {
  return new Promise((resolve, reject) => {
      // Validate the input data using the defined schema
      const validation = SchemaValidation.validate({ titre, discription, auteur, format, nb_pages, img, prix, promotion, categorie, book });
      
      // If validation fails, reject the promise with the validation error message
      if (validation.error) {
          reject(validation.error.details[0].message);
          return;
      } else {
          // If validation passes, create a new eBook entry in the database
          db.Ebook.create({
              titre,
              discription,
              auteur,
              format,
              nb_pages,
              img,
              prix,
              promotion,
              categorie,
              book,
              CentreId,
          })
          .then(response => {
              resolve(response); // Resolve the promise with the response from the database
          })
          .catch(err => {
              reject(err); // If there's an error during creation, reject the promise with the error
          });
      }
  });
};

// Joi schema for validating eBook data before updating it in the database
const SchemaValidation2 = Joi.object({
  titre: Joi.string().min(2).max(30).required(), // Title must be between 2 and 30 characters
  discription: Joi.string().min(30).max(300).required(), // Description must be between 30 and 300 characters
  auteur: Joi.string().pattern(/^[a-zA-Z\-\s]+$/).required(), // Author must contain only letters, hyphens, and spaces
  format: Joi.string().valid('pdf', 'doc', 'docx', 'ppt', 'pptx', 'epub', 'mobi').required(), // Format must be one of the specified values
  nb_pages: Joi.number().positive().integer().required(), // Number of pages must be a positive integer
  prix: Joi.number().positive().max(9999999999).required(), // Price must be a positive number with a maximum value
  promotion: Joi.number().integer().max(100).required(), // Promotion must be an integer and represent a percentage (0-100)
  categorie: Joi.string().required(), // Category is required
  book: Joi.string().regex(/.(pdf|doc|docx|ppt|epub|pptx|mobi)$/).allow('') // Book file must be of valid format or empty
});

// Function to update an existing eBook in the database
const updateebook = (titre, discription, auteur, format, nb_pages, prix, promotion, categorie, book, id) => {
  return new Promise((resolve, reject) => {
    // Validate the input data using the defined schema
    let validation = SchemaValidation2.validate({ titre, discription, auteur, format, nb_pages, prix, promotion, categorie, book });
    
    // If validation fails, reject the promise with the validation error message
    if (validation.error) {
      reject(validation.error.details[0].message);
    } else {
      // Find the eBook by its primary key (ID)
      db.Ebook.findByPk(id)
        .then(ebook => {
          // If no new book file is provided, keep the existing book file
          if (!book) {
            book = ebook.book; // Use the old book path if a new book path is not provided
          }
          // Update the eBook entry with the new data
          db.Ebook.update({
            titre: titre,
            discription: discription,
            auteur: auteur,
            format: format,
            nb_pages: nb_pages,
            prix: prix,
            promotion: promotion,
            categorie: categorie,
            book: book
          }, { where: { id: id } })
          .then((response) => resolve(response)) // Resolve the promise with the response from the database
          .catch((err) => reject(err)); // If there's an error during the update, reject the promise with the error
        })
        .catch((err) => reject(err)); // If there's an error finding the eBook, reject the promise with the error
    }
  });
};

// Function to delete an existing eBook from the database
const Deleteebook = (req, res) => {
  const id = req.params.id; // Get the eBook ID from the request parameters
  
  // Delete the eBook entry from the database
  db.Ebook.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "eBook was deleted successfully!" // Send a success message if the deletion was successful
      });
    } else {
      res.send({
        message: `Cannot delete eBook with id=${id}. Maybe eBook was not found!` // Send a message if the eBook was not found
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete eBook with id=" + id // Send an error message if there was an issue deleting the eBook
    });
  });
};

// Multer configuration for handling file uploads (images and eBooks)

// Disk storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Set the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename using the current timestamp to ensure unique filenames
  }
});

// General upload handler allowing multiple file types (images, documents, eBooks)
const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|epub|mobi|docx|ppt|pptx/; // Allowed file types
    const mimeType = fileTypes.test(file.mimetype); // Check MIME type
    const extname = fileTypes.test(path.extname(file.originalname)); // Check file extension

    if(mimeType && extname) {
      return cb(null, true); // Accept the file if it meets the criteria
    }
    cb('Give proper file format to upload'); // Reject the file if it doesn't meet the criteria
  }
}).fields([{ name: 'img', maxCount: 1 }, { name: 'book', maxCount: 1 }]); // Specify fields for image and book uploads

// Specific upload handler for eBooks
const update = multer({
  storage: storage,
  limits: { fileSize: '1000000' }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|epub|mobi|docx|ppt|pptx/; // Allowed eBook file types
    const mimeType = fileTypes.test(file.mimetype); // Check MIME type
    const extname = fileTypes.test(path.extname(file.originalname)); // Check file extension

    if(mimeType && extname) {
      return cb(null, true); // Accept the file if it meets the criteria
    }
    cb('Give proper file format to upload'); // Reject the file if it doesn't meet the criteria
  }
}).single('book'); // Handle a single eBook upload

// Export the functions and multer configurations for use in other modules
module.exports = {
  addebook,
  updateebook,
  Deleteebook,
  upload,
  update
};
