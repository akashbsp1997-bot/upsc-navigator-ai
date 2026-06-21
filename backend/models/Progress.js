const pool = require('../config/database');

class Progress {
  static async updateModuleProgress(userId, moduleId, stage) {
    // stage: '3_days_learning', '3_days_revision', '1_day_reality_check'
    const query = `
      INSERT INTO progress (user_id, module_id, stage, completed_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (user_id, module_id) 
      DO UPDATE SET stage = $3, completed_at = NOW()
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, moduleId, stage]);
    return result.rows[0];
  }

  static async getUserProgress(userId) {
    const query = `
      SELECT m.week_number, m.topic, p.stage, p.completed_at
      FROM modules m
      LEFT JOIN progress p ON m.id = p.module_id AND p.user_id = $1
      ORDER BY m.week_number;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getProgressStats(userId) {
    const query = `
      SELECT 
        COUNT(*) as total_modules,
        COUNT(CASE WHEN stage = '3_days_learning' THEN 1 END) as learning_completed,
        COUNT(CASE WHEN stage = '3_days_revision' THEN 1 END) as revision_completed,
        COUNT(CASE WHEN stage = '1_day_reality_check' THEN 1 END) as reality_check_completed
      FROM progress WHERE user_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = Progress;
