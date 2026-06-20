// backend/agents/news-agent.js

/**
 * News Agent: Evaluates relevance and processes high-value content.
 */
async function processNewsFlow(article) {
    // 1. Basudev Limit: Threshold Filtering
    if (!isRelevant(article)) {
        return null;
    }

    // 2. AI Processing
    const analysis = await analyzeWithAI(article);
    
    // 3. Save to PostgreSQL here (e.g., using your db client)
    console.log(`Article saved: ${article.title}`);
}

function isRelevant(article) {
    const keywords = ['polity', 'economy', 'environment', 'bill', 'court'];
    const text = (article.title + article.content).toLowerCase();
    // Only proceed if content contains high-value UPSC keywords
    return keywords.some(keyword => text.includes(keyword));
}

async function analyzeWithAI(article) {
    // LLM call goes here
    return { summary: "...", relevance: 9.0 };
}

module.exports = { processNewsFlow };
