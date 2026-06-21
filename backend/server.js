const express = require('express');
const cors = require('cors');
require('dotenv').config();
const newsRoutes = require('./routes/news');
const modulesRoutes = require('./routes/modules');
const notesRoutes = require('./routes/notes');
const progressRoutes = require('./routes/progress');
const recommendationRoutes = require('./routes/recommendations');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
