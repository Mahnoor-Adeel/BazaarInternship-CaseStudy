import express from 'express';
import { login } from '../Controllers/AuthController.js'; // Import the controller

const router = express.Router();

router.post('/login', login);

export default router;
