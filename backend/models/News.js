const pool = require('../config/database');

class News {
  static async create(newsData) {
    const query = `
      INSERT INTO news (title, content, source, topic_mapping, relevant_concepts, url, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [
      newsData.title,
      newsData.content,
      newsData.source,
      JSON.stringify(newsData.topicMapping),
      JSON.stringify(newsData.relevantConcepts),
      newsData.url,
    ]);
    return result.rows[0];
  }

  static async findAll(limit = 20, offset = 0) {
    const query = `
      SELECT * FROM news 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2;
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  static async findByTopic(topic) {
    const query = `
      SELECT * FROM news 
      WHERE topic_mapping @> $1::jsonb
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [JSON.stringify({ topics: [topic] })]);
    return result.rows;
  }
}

module.exports = News;
