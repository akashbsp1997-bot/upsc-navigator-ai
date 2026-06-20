// backend/workers/newspaper-sync.js
const cron = require('node-cron');
const axios = require('axios');
const { processNewsFlow } = require('../agents/news-agent');

// Schedule: Runs every day at 4:00 AM UTC
cron.schedule('0 4 * * *', async () => {
    console.log('Starting daily news sync...');
    
    try {
        // 1. Fetch raw data (Example: PIB RSS or News API)
        const response = await axios.get('https://api.example.com/pib-feed');
        const articles = response.data.articles;

        // 2. Process each article
        for (const article of articles) {
            await processNewsFlow(article);
        }
        console.log('Daily sync complete.');
    } catch (error) {
        console.error('Error during sync:', error);
    }
}, {
    timezone: "Etc/UTC" 
});
