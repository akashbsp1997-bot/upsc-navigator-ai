const pool = require('../config/database');

class Module {
  static async create(moduleData) {
    const query = `
      INSERT INTO modules (week_number, topic, subtopics, strategy_3_3_1, pyq_links, estimated_hours, optional_subject)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      moduleData.weekNumber,
      moduleData.topic,
      JSON.stringify(moduleData.subtopics),
      JSON.stringify(moduleData.strategy_3_3_1),
      JSON.stringify(moduleData.pyqLinks),
      moduleData.estimatedHours,
      moduleData.optionalSubject,
    ]);
    return result.rows[0];
  }

  static async findByWeek(weekNumber) {
    const query = `SELECT * FROM modules WHERE week_number = $1;`;
    const result = await pool.query(query, [weekNumber]);
    return result.rows[0];
  }

  static async findAll(optionalSubject = 'Law') {
    const query = `
      SELECT * FROM modules 
      WHERE optional_subject = $1 
      ORDER BY week_number ASC;
    `;
    const result = await pool.query(query, [optionalSubject]);
    return result.rows;
  }
}

module.exports = Module;
