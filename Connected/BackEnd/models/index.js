'use strict';

// Import necessary modules
const fs = require('fs'); // File system module to interact with the file system
const path = require('path'); // Path module to work with file and directory paths
const Sequelize = require('sequelize'); // Sequelize library for database ORM
const process = require('process'); // Process module to interact with the current process

// Get the base name of the current file (e.g., 'index.js')
const basename = path.basename(__filename);

// Get the current environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';

// Load the appropriate configuration file based on the environment
const config = require(__dirname + '/../config/config.json')[env];

// Initialize an empty object to store the database models
const db = {};

// Initialize the Sequelize instance
let sequelize;
if (config.use_env_variable) {
  // If the environment variable is set, use it to connect to the database
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Otherwise, connect using the configuration from the config file
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory (except this file) and initialize models
fs
  .readdirSync(__dirname) // Read the contents of the directory
  .filter(file => {
    // Filter out files that:
    return (
      file.indexOf('.') !== 0 && // Start with a dot (hidden files)
      file !== basename && // Are the current file itself
      file.slice(-3) === '.js' && // Do not end with '.js' (JavaScript files)
      file.indexOf('.test.js') === -1 // Are not test files
    );
  })
  .forEach(file => {
    // For each valid file, require the model and add it to the db object
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Set up model associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the Sequelize instance and library to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object containing all models and the Sequelize instance
module.exports = db;
