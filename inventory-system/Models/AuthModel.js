import { pool } from "../GlobalDB/globalDB_Connect.js";
export const findUser = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username]; 
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; 
    } catch (err) {
      console.error('Error querying users:', err);
      throw err;
    }
  };

  