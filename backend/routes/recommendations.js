const express = require('express');
const { generateDailyPlan } = require('../services/recommendation-engine');

const router = express.Router();

// Get daily recommendation
router.get('/daily', async (req, res) => {
  try {
    const plan = await generateDailyPlan(req.user.id);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
