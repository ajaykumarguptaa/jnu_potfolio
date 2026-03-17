import db from "../config/db.js";
import { sendEmail } from "./sendemail.controller.js";

export const contact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    await db.query(
      "INSERT INTO Contact (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    await sendEmail(name, email, message);
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};