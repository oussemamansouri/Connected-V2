const express = require('express'); // Import Express framework
const db = require('./models'); // Import database models
const cors = require('cors'); // Import CORS middleware
const path = require("path"); // Import path module for working with file and directory paths

// Import various routers for different routes
const client_router = require(path.join(__dirname, 'routers', 'client-router'));
const centre_router = require('./routers/centre-router');
const admin_router = require('./routers/admin-router');
const formation_router = require('./routers/formation-router');
const ebook_router = require('./routers/ebook-router');
const participation_router = require('./routers/participation-router');
const achat_router = require('./routers/achat-router');
const login_router = require('./routers/login-router');
const dashboard_router = require('./routers/dashboard-router');

const app = express(); // Initialize Express app

// Middleware to parse URL-encoded data with the extended option set to true
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the "public/images" directory
app.use("/public/images", express.static(path.join(__dirname, 'public', 'images')));

// Middleware to set headers for CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Request-Methods", "*"); // Allow any request methods
  res.setHeader("Access-Control-Allow-Headers", "*"); // Allow any headers
  res.setHeader("Access-Control-Allow-Methods", "*"); // Allow any HTTP methods
  next(); // Pass control to the next middleware
});

// CORS middleware configuration
app.use(
  cors({
    origin: true, // Allow requests from any origin
    credentials: true, // Allow credentials (cookies, headers, etc.)
    methods: "POST,GET,PUT,PATCH,OPTIONS,DELETE", // Allowed HTTP methods
  })
);

// Register route handlers for different routes
app.use('/', login_router); // Routes for login
app.use('/client', client_router); // Routes for client operations
app.use('/centre', centre_router); // Routes for center operations
app.use('/admin', admin_router); // Routes for admin operations
app.use('/', formation_router); // Routes for formation operations
app.use('/', ebook_router); // Routes for ebook operations
app.use('/', participation_router); // Routes for participation operations
app.use('/', achat_router); // Routes for purchase operations
app.use('/', dashboard_router); // Routes for dashboard operations

//////////////////////////////////////////////////////////////////////////////

// Route to download an ebook by its ID
app.get('/download-book/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract ebook ID from request parameters
    const ebook = await db.Ebook.findByPk(id); // Retrieve the ebook with the specified ID from the database

    if (!ebook) {
      return res.status(404).send('Ebook not found'); // Send 404 if ebook not found
    }

    const filePath = path.join(__dirname, ebook.book); // Construct the file path to the ebook file
    const fileName = `Ebook.${path.extname(filePath).split('.').pop()}`; // Generate the file name with extension

    // Set the Content-Disposition header to force the browser to download the file
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Send the file to the client
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error sending file'); // Send 500 if error occurs
      } else {
        console.log(`Sent ${fileName}`); // Log success
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error'); // Send 500 for server error
  }
});

//////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 3000; // Set the server port, use environment variable or default to 3000

// Sync the database models and start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server and log the port
});
