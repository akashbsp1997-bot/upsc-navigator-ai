const express = require('express');
const Module = require('../models/Module');

const router = express.Router();

// Get all modules
router.get('/', async (req, res) => {
  try {
    const { optionalSubject = 'Law' } = req.query;
    const modules = await Module.findAll(optionalSubject);
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get module by week
router.get('/week/:week', async (req, res) => {
  try {
    const module = await Module.findByWeek(parseInt(req.params.week));
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
