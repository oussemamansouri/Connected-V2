const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/counts', async (req, res) => {
  try {
    const clientCount = await db.Client.count();
    const centreCount = await db.Centre.count();
    const formationCount = await db.Formation.count();
    const ebookCount = await db.Ebook.count();
    const participationCount = await db.Participation.count();
    const achatCount = await db.Achat.count();

    res.status(200).json({
      clientCount,
      centreCount,
      formationCount,
      ebookCount,
      participationCount,
      achatCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
