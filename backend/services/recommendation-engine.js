const Anthropic = require('@anthropic-ai/sdk');
const Progress = require('../models/Progress');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateDailyPlan(userId) {
  // Get user progress
  const progress = await Progress.getUserProgress(userId);
  const stats = await Progress.getProgressStats(userId);

  const prompt = `
Based on the user's UPSC preparation progress, generate a personalized daily study plan:

Current Progress:
${JSON.stringify(progress)}

Statistics:
${JSON.stringify(stats)}

Consider:
1. Modules not yet started (prioritize)
2. Modules in learning phase (encourage)
3. Modules in revision phase (intensive practice)
4. Weak areas from tests

Generate a detailed daily plan in JSON format with:
- Morning routine (topics to revise)
- Afternoon session (new topics to learn)
- Evening session (tests/PYQs)
- Night time (light revision/mnemonics)
- Priority modules for the week
- Recommended break schedule
  `;

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  const responseText = message.content[0].text;
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch[0]);
}

module.exports = { generateDailyPlan };
