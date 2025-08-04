import express from 'express'
const router = express.Router();

import { registerUser, loginUser } from '../controllers/authController.js';

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

export default router;
