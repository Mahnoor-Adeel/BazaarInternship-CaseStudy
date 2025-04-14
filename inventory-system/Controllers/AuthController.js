import { findUser } from '../Models/AuthModel.js';
import { findUserStore } from '../Models/StoreModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await findUser(username);

    if (!user) {
      return res.status(401).json({ message: 'Username not found' });
    }
    
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

    let store = null;
    if (user.role === 'store_admin') {
      store = await findUserStore(username);
      if (!store) {
        return res.status(404).json({ message: 'Store not found for this user' });
      }
    }

    
    const payload = {
      user_id: user.user_id,
      role: user.role, 
    };

    if (store) {
      payload.store_id = store.store_id;
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    // Step 6: Send the token as a response
    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
