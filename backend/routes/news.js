const express = require('express');
const News = require('../models/News');

const router = express.Router();

// Get all news
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const news = await News.findAll(limit, offset);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get news by topic
router.get('/topic/:topic', async (req, res) => {
  try {
    const news = await News.findByTopic(req.params.topic);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
