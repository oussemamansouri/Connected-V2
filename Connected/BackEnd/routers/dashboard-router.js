const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router instance
const db = require('../models'); // Import database models

// Route to get counts of various entities in the database
router.get('/counts', async (req, res) => {
  try {
    // Fetch counts for different entities from the database
    const clientCount = await db.Client.count(); // Count of clients
    const centreCount = await db.Centre.count(); // Count of centres
    const formationCount = await db.Formation.count(); // Count of formations
    const ebookCount = await db.Ebook.count(); // Count of ebooks
    const participationCount = await db.Participation.count(); // Count of participations
    const achatCount = await db.Achat.count(); // Count of achats

    // Send the counts as a JSON response
    res.status(200).json({
      clientCount, // Number of clients
      centreCount, // Number of centres
      formationCount, // Number of formations
      ebookCount, // Number of ebooks
      participationCount, // Number of participations
      achatCount // Number of achats
    });
  } catch (err) {
    // Log the error to the console
    console.error(err);
    // Send a 500 status code and error message if something goes wrong
    res.status(500).send('Server error');
  }
});

module.exports = router; // Export the router instance
