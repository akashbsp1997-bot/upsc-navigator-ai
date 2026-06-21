const express = require('express');
const Notes = require('../models/Notes');

const router = express.Router();

// Create note
router.post('/', async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update note
router.put('/:id', async (req, res) => {
  try {
    const note = await Notes.update(req.params.id, req.body);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get notes by topic
router.get('/topic/:topic', async (req, res) => {
  try {
    const notes = await Notes.findByTopic(req.user.id, req.params.topic);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
