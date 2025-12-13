import transporter from "../config/mailer.js";

async function sendEmail() {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "test@example.com",
    subject: "Test Email",
    text: "It works!"
  });
}

sendEmail();
