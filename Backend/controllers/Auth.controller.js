import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/transporter.js";
import dotenv from "dotenv";
dotenv.config();

// REGISTER (MAX 5 ADMINS)
export const register = async (req, res) => {
  try {
    const { admin_user_name, admin_email, admin_password } = req.body;

    if (!admin_user_name || !admin_email || !admin_password) {
      return res
        .status(400)
        .json({ message: "All fields required", success: false });
    }

    const [count] = await db.query("SELECT COUNT(*) AS total FROM admin");
    if (count[0].total >= 5) {
      return res
        .status(403)
        .json({ message: "Only 5 admins allowed", success: false });
    }

    const [exists] = await db.query(
      "SELECT * FROM admin WHERE admin_email = ?",
      [admin_email]
    );
    if (exists.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    const hashed = await bcrypt.hash(admin_password, 10);

    await db.query(
      `INSERT INTO admin (admin_user_name, admin_email, admin_password)
       VALUES (?, ?, ?)`,
      [admin_user_name, admin_email, hashed]
    );

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    console.log("otp is signup", otp);

    await db.query(
      "UPDATE admin SET otp_code = ?, otp_expires = ? WHERE admin_email = ?",
      [otp, otpExpires, admin_email]
    );

    await transporter.sendMail({
      from: `"Admin Verification" <${process.env.MAIL_FROM}>`,
      to: admin_email,
      subject: "Your Signup OTP",
      html: `
        <h2>Your OTP Code</h2>
        <p>Your login OTP is: <b>${otp}</b></p>
        <p>Expires in 5 minutes.</p>
      `,
    });

    res.json({
      message: "Admin Sugnup OTP send success fully........",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// LOGIN → SEND OTP
export const login = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const { MAIL_FROM } = process.env;

    console.log("env email from", MAIL_FROM);
    console.log("email", admin_email);

    const [rows] = await db.query("SELECT * FROM admin WHERE admin_email = ?", [
      admin_email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const admin = rows[0];

    const match = await bcrypt.compare(admin_password, admin.admin_password);
    if (!match)
      return res.status(400).json({ error: "Invalid email or password" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("otp is", otp);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await db.query(
      "UPDATE admin SET otp_code = ?, otp_expires = ? WHERE admin_email = ?",
      [otp, otpExpires, admin_email]
    );

    await transporter.sendMail({
      from: `"Admin Verification" <${process.env.MAIL_FROM}>`,
      to: admin_email,
      subject: "Your Login OTP",
      html: `
        <h2>Your OTP Code</h2>
        <p>Your login OTP is: <b>${otp}</b></p>
        <p>Expires in 5 minutes.</p>
      `,
    });

    res.json({ message: "OTP sent to email", success: true });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// VERIFY OTP → SET COOKIE TOKEN
export const verifyOTP = async (req, res) => {
  try {
    const { admin_email, otp_code } = req.body;
    console.log(otp_code);

    const [rows] = await db.query(
      "SELECT * FROM admin WHERE admin_email = ? AND otp_code = ?",
      [admin_email, otp_code]
    );
    console.log("verfy otp data", rows);

    if (rows.length === 0)
      return res.status(400).json({ error: "Invalid OTP" });

    const admin = rows[0];

    if (new Date(admin.otp_expires) < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    await db.query(
      "UPDATE admin SET otp_code = NULL, otp_expires = NULL WHERE admin_email = ?",
      [admin_email]
    );

    const token = jwt.sign(
      { admin_id: admin.admin_id, admin_email: admin.admin_email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Otp verification successful.........",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("adminToken");
  res.json({ message: "Logged out", success: true });
};

// FORGOT PASSWORD → SEND RESET TOKEN
export const forgotPassword = async (req, res) => {
  try {
    const { admin_email } = req.body;

    const [rows] = await db.query("SELECT * FROM admin WHERE admin_email = ?", [
      admin_email,
    ]);

    if (rows.length === 0) {
      return res.json({ message: "If email exists, reset code will be sent" });
    }

    const resetToken = Math.random().toString(36).slice(2, 10);
    console.log("resetToken", resetToken);
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await db.query(
      "UPDATE admin SET reset_token = ?, reset_expires = ? WHERE admin_email = ?",
      [resetToken, expires, admin_email]
    );

    await transporter.sendMail({
      from: `"Admin Reset" <${process.env.MAIL_FROM}>`,
      to: admin_email,
      subject: "Password Reset Token",
      html: `
        <h2>Password Reset</h2>
        <p>Your reset token is <b>${resetToken}</b></p>
        <p>Expires in 15 minutes.</p>
      `,
    });

    res.json({ message: "Reset token sent", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { admin_email, reset_token, new_password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM admin WHERE admin_email = ? AND reset_token = ?",
      [admin_email, reset_token]
    );

    if (rows.length === 0)
      return res.status(400).json({ error: "Invalid token" });

    const admin = rows[0];

    if (new Date(admin.reset_expires) < new Date()) {
      return res.status(400).json({ error: "Token expired" });
    }

    const hashed = await bcrypt.hash(new_password, 10);

    await db.query(
      "UPDATE admin SET admin_password = ?, reset_token = NULL, reset_expires = NULL WHERE admin_email = ?",
      [hashed, admin_email]
    );

    res.json({ message: "Password reset successful", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", success: false });
  }
};
