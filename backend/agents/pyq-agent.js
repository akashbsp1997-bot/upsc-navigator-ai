const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function analyzePYQTrends(pyqData) {
  const prompt = `
Analyze these Previous Year Questions and identify:
1. Recurring topics (topics that appear frequently)
2. New emerging topics (topics that didn't appear before but might appear)
3. Topic frequency by year
4. Pattern in question types (descriptive, short note, case study, map-based)

PYQ Data:
${JSON.stringify(pyqData, null, 2)}

Respond in JSON format with detailed analysis.
  `;

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  return JSON.parse(message.content[0].text);
}

async function downloadPYQs(yearsRange = 10) {
  // This would connect to sources like UPSC website, InsideIAS, etc.
  console.log(`Downloading PYQs for last ${yearsRange} years...`);
  // Implementation would fetch from actual sources
  return [];
}

module.exports = { analyzePYQTrends, downloadPYQs };
