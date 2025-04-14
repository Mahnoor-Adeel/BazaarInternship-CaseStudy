import { pool } from "../GlobalDB/globalDB_Connect.js";
export const findUserStore = async (username) => {
    const query = 'SELECT s.store_id FROM stores s INNER JOIN users u ON s.store_manager_id = u.user_id WHERE u.username = $1';
    const values = [username];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error querying store by user:', err);
      throw err;
    }
  };
  
  