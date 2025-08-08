import express from 'express'
import authenticate from '../middlewares/authenticate.js'
const router = express.Router();

import { registerUser, loginUser ,logoutController ,getMe} from '../controllers/authController.js';

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);
router.post("/logout",authenticate, logoutController);
router.get("/me", authenticate, getMe);

export default router;
