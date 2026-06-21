const express = require('express');
const Progress = require('../models/Progress');

const router = express.Router();

// Update progress
router.post('/update', async (req, res) => {
  try {
    const { moduleId, stage } = req.body;
    const progress = await Progress.updateModuleProgress(req.user.id, moduleId, stage);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress
router.get('/user', async (req, res) => {
  try {
    const progress = await Progress.getUserProgress(req.user.id);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Progress.getProgressStats(req.user.id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
