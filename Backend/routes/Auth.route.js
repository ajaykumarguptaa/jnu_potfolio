import express from "express";
import {
  register,
  login,
  verifyOTP,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/Auth.controller.js";
import { verifyAdmin } from "../middleware/Auth.middleware.js";

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.post("/verify-otp", verifyOTP);
authrouter.post("/forgot-password", forgotPassword);
authrouter.post("/reset-password", resetPassword);
authrouter.get("/logout", logout);

authrouter.get("/me", verifyAdmin, (req, res) => {
  res.json({ admin: req.admin });
});


export default authrouter;
