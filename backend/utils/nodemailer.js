import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config(); 


export const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user:  process.env.EMAIL_USER ,
    pass:  process.env.EMAIL_PASS ,
  },
});
