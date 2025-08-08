import { transporter } from "../utils/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

export const sendSupportMailController = async (req, res) => {
  const {name,email, subject, message } = req.body;
  console.log("--message--",req.body)
  // user from token (middleware se)
  const user = req.user;

  if (!user || !subject || !message) {
    return res.status(400).json({ error: "Please fill all fields." });
  }
  console.log("&&&",user)

  const mailOptions = {
    from: email,
    to: "soniyaakada@gmail.com", // your personal email
    subject: `Support Request from ${name}: ${subject}`,
    html: `
      <h3>New Support Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };
  console.log("--",mailOptions)
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email." });
  }
};
