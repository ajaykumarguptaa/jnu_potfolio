import express from "express";
import transporter from "../config/mailer.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"My App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`
    });

    res.json({ success: true, message: "Email sent " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
