import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_jwt_secret';

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, {
      expiresIn: '7d',
    });

     res.cookie("token", token, {
      httpOnly: true,
      secure: true,           // Set true in production (HTTPS)
      sameSite: "None",     // Or "Lax" depending on frontend-backend domains
      maxAge: 60 * 60 * 1000, // 1 hour
    }).status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
