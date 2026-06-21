const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateModules(syllabusData, weeksAvailable = 52, optionalSubject = 'Law') {
  const prompt = `
Create a 52-week module structure for UPSC preparation using the 3+3+1 strategy:
- 3 days: Learning & Reading
- 3 days: Intensive Revision & Note-making
- 1 day: Reality Check (Tests & Assessment)

Syllabus: ${JSON.stringify(syllabusData)}
Weeks Available: ${weeksAvailable}
Optional Subject: ${optionalSubject}

For each week, provide:
1. Main topics to cover
2. Subtopics
3. Key questions to solve
4. Expected study hours
5. Revision strategy
6. Test questions (PYQ links)

Respond in JSON array format for 52 modules.
  `;

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const responseText = message.content[0].text;
  const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
  return JSON.parse(jsonMatch[0]);
}

function divideInto3_3_1(moduleContent) {
  return {
    day_1_3: {
      type: 'Learning',
      activities: [
        'Read NCERT chapters',
        'Make comprehensive notes',
        'Understand concepts deeply'
      ],
      duration: '3 hours/day'
    },
    day_4_6: {
      type: 'Revision & Tests',
      activities: [
        'Intensive revision of 3 days\' content',
        'Make memory notes and mnemonics',
        'Solve related PYQs'
      ],
      duration: '3 hours/day'
    },
    day_7: {
      type: 'Reality Check',
      activities: [
        'Full mock test on the module',
        'Analyze performance',
        'Update weak areas'
      ],
      duration: '2-3 hours'
    }
  };
}

module.exports = { generateModules, divideInto3_3_1 };
