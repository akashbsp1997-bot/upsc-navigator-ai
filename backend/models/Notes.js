const pool = require('../config/database');

class Notes {
  static async create(noteData) {
    const query = `
      INSERT INTO notes (user_id, topic, content, note_type, mnemonics, mind_map, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [
      noteData.userId,
      noteData.topic,
      noteData.content,
      noteData.noteType, // 'text', 'mindmap', 'mnemonic', 'pictogram'
      JSON.stringify(noteData.mnemonics || {}),
      JSON.stringify(noteData.mindMap || {}),
    ]);
    return result.rows[0];
  }

  static async update(noteId, updateData) {
    const query = `
      UPDATE notes 
      SET content = $2, mnemonics = $3, mind_map = $4, updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [
      noteId,
      updateData.content,
      JSON.stringify(updateData.mnemonics || {}),
      JSON.stringify(updateData.mindMap || {}),
    ]);
    return result.rows[0];
  }

  static async findByTopic(userId, topic) {
    const query = `SELECT * FROM notes WHERE user_id = $1 AND topic = $2;`;
    const result = await pool.query(query, [userId, topic]);
    return result.rows;
  }
}

module.exports = Notes;
