const pool = require('../config/database');

const db = {
  async query(sql, params) {
    try {
      const [results] = await pool.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Database Error:', error);
      throw error;
    }
  },

  async getConnection() {
    try {
      return await pool.getConnection();
    } catch (error) {
      console.error('Connection Error:', error);
      throw error;
    }
  },
};

module.exports = db;
