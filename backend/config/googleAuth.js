import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`,
      scope: ["profile", "email"], // Add scope here as well
      passReqToCallback: false
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user by googleId
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          // Check if user exists with same email
          const existingUser = await User.findOne({ email: profile.emails[0].value });
          
          if (existingUser) {
            // Update existing user with googleId
            existingUser.googleId = profile.id;
            user = await existingUser.save();
          } else {
            // Create new user
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: Math.random().toString(36).slice(-8),
            });
          }
        }

        return done(null, user);
      } catch (err) {
        console.error("Google OAuth Error:", err);
        return done(err, null);
      }
    }
  )
);

export default passport;