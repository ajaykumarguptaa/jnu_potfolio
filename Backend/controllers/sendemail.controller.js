import { transporter } from "../config/transporter.js";

export async function sendEmail(name, email, message) {
  await transporter.sendMail({
    from: `"Contact Form" <${process.env.MAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
`
  });
}