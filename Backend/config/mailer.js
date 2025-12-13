import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send email
async function sendMail() {
  const info = await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`,
    to: "receiver@example.com",
    subject: "Test Email",
    text: "Hello from Node.js SMTP!",
    html: "<b>Hello from Node.js SMTP!</b>"
  });

  console.log("Message sent:", info.messageId);
  transporter.verify((err, success) => {
  if (err) console.error(err);
  else console.log("SMTP Ready to send messages");
});

}

sendMail().catch(console.error);
