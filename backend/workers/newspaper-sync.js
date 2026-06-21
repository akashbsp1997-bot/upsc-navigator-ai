const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const { processNewsFlow } = require('../agents/news-agent');

const NEWS_SOURCES = [
  {
    name: 'PIB',
    url: 'https://pib.gov.in',
    rss: 'https://pib.gov.in/rss.aspx'
  },
  {
    name: 'The Hindu',
    url: 'https://www.thehindu.com',
    category: '/news/'
  },
  {
    name: 'Indian Express',
    url: 'https://indianexpress.com'
  }
];

async function syncNews() {
  console.log('[' + new Date().toISOString() + '] Starting news sync...');
  
  try {
    for (const source of NEWS_SOURCES) {
      await fetchAndProcessNews(source);
    }
    console.log('[' + new Date().toISOString() + '] News sync completed');
  } catch (error) {
    console.error('Error during sync:', error.message);
  }
}

async function fetchAndProcessNews(source) {
  try {
    const response = await axios.get(source.rss || source.url, {
      timeout: 10000
    });

    // Parse RSS or HTML
    const articles = parseNewsSource(response.data, source.name);
    
    for (const article of articles) {
      await processNewsFlow({
        ...article,
        source: source.name
      });
    }
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error.message);
  }
}

function parseNewsSource(data, sourceName) {
  // For RSS feeds
  const $ = cheerio.load(data);
  const articles = [];

  if (sourceName === 'PIB') {
    $('item').each((i, elem) => {
      articles.push({
        title: $(elem).find('title').text(),
        content: $(elem).find('description').text(),
        url: $(elem).find('link').text(),
      });
    });
  }
  
  return articles;
}

// Schedule sync at specified times (default: 4 AM and 8 PM UTC)
const sync_time_1 = process.env.SYNC_TIME_1 || '04:00';
const sync_time_2 = process.env.SYNC_TIME_2 || '20:00';

const [hour1, min1] = sync_time_1.split(':');
const [hour2, min2] = sync_time_2.split(':');

cron.schedule(`${min1} ${hour1} * * *`, syncNews, {
  timezone: 'Etc/UTC'
});

cron.schedule(`${min2} ${hour2} * * *`, syncNews, {
  timezone: 'Etc/UTC'
});

console.log(`News sync scheduled for ${sync_time_1} and ${sync_time_2} UTC`);

module.exports = { syncNews };
