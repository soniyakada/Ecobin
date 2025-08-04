// index.js or server.js

import express from "express";
import dotenv from "dotenv";
dotenv.config(); 
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js'
import pickupRoutes from './routes/pickupRoutes.js'
import staffRoutes from './routes/staffRoutes.js'


const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/pickup', pickupRoutes);
app.use('/api/staff',staffRoutes);

//route to check
app.get('/', (req,res)=>{
  res.send("Hello Ecobin");
})

// Start server only after DB is connected
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1); // Optional: exit the process on DB failure
  });
