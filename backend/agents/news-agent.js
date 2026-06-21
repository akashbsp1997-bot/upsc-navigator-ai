const Anthropic = require('@anthropic-ai/sdk');
const News = require('../models/News');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const UPSC_TOPIC_MAPPING = {
  'climate': ['Geography', 'Environment', 'Climate Change'],
  'adiabatic': ['Geography', 'Wind Systems', 'Weather'],
  'biodiversity': ['Environment', 'Ecology', 'Biology'],
  'government': ['Polity', 'Administration', 'Law'],
  'economy': ['Economy', 'Finance', 'Trade'],
  'court': ['Polity', 'Law', 'Constitution'],
  'bill': ['Polity', 'Law', 'Parliament'],
  'amendment': ['Constitution', 'Polity'],
  'treaty': ['International Relations', 'Diplomacy'],
  'disaster': ['Geography', 'Environment', 'Management'],
  'agriculture': ['Economy', 'Geography', 'Development'],
};

async function processNewsFlow(article) {
  try {
    // Step 1: Relevance filtering
    const isRelevant = checkRelevance(article.title + ' ' + article.content);
    if (!isRelevant) {
      console.log(`Filtered out: ${article.title}`);
      return null;
    }

    // Step 2: AI Analysis
    const analysis = await analyzeWithAI(article);
    
    // Step 3: Save to database
    const newsRecord = await News.create({
      title: article.title,
      content: article.content,
      source: article.source,
      topicMapping: analysis.topics,
      relevantConcepts: analysis.concepts,
      url: article.url,
    });

    console.log(`Processed: ${article.title}`);
    return newsRecord;
  } catch (error) {
    console.error(`Error processing article: ${error.message}`);
    return null;
  }
}

function checkRelevance(text) {
  const keywords = [
    'polity', 'economy', 'environment', 'bill', 'court', 'amendment',
    'climate', 'agriculture', 'disaster', 'education', 'healthcare',
    'infrastructure', 'international', 'defence', 'constitution'
  ];
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword));
}

async function analyzeWithAI(article) {
  const prompt = `
Analyze this UPSC-relevant news article and extract:
1. Key UPSC topics (from Polity, History, Geography, Environment, Economy, etc.)
2. Relevant concepts (specific subjects like "Adiabatic Winds", "Gene Expression", etc.)
3. Connection to syllabus (how it maps to UPSC General Studies)

Article Title: ${article.title}
Article Content: ${article.content}

Respond in JSON format:
{
  "topics": ["Topic1", "Topic2"],
  "concepts": ["Concept1", "Concept2"],
  "syllabus_mapping": "Connection explanation"
}
  `;

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  try {
    const responseText = message.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    return {
      topics: extractKeywords(article.title),
      concepts: [],
      syllabus_mapping: 'General relevance to UPSC'
    };
  }
}

function extractKeywords(text) {
  const foundTopics = [];
  for (const [keyword, topics] of Object.entries(UPSC_TOPIC_MAPPING)) {
    if (text.toLowerCase().includes(keyword)) {
      foundTopics.push(...topics);
    }
  }
  return [...new Set(foundTopics)];
}

module.exports = { processNewsFlow, checkRelevance, analyzeWithAI };
