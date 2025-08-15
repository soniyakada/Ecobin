import express from 'express'
import authenticate from '../middlewares/authenticate.js'
import passport from "passport";
import jwt from "jsonwebtoken";
const router = express.Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

import { registerUser, loginUser ,logoutController ,getMe} from '../controllers/authController.js';

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);
router.post("/logout",authenticate, logoutController);
router.get("/me", authenticate, getMe);

// Step 1: Redirect user to Google
// Google OAuth routes
router.get("/google", (req, res, next) => {

  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })(req, res, next);
});

router.get("/google/callback", (req, res, next) => {

  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`
  }, (err, user, info) => {
    if (err) {
      
      return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_error`);
    }
    
    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=no_user`);
    }

    try {
      // Create JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          email: user.email,
          role: user.role || 'user'
        },
        JWT_SECRET_KEY,
        { expiresIn: '7d' }
      );

      // Set JWT token in httpOnly cookie
      res.cookie("token", token, {
        httpOnly: true,
         secure: true,           // Set true in production (HTTPS)
      sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(`${process.env.CLIENT_URL}/user/home`);
      
    } catch (error) {
    
      res.redirect(`${process.env.CLIENT_URL}/login?error=token_failed`);
    }
  })(req, res, next);
});



export default router;
