const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const query = `
      INSERT INTO users (email, password, name, exam_year, optional_subject, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id, email, name, exam_year, optional_subject;
    `;
    const result = await pool.query(query, [
      userData.email,
      hashedPassword,
      userData.name,
      userData.examYear || 2026,
      userData.optionalSubject || 'Law',
    ]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
