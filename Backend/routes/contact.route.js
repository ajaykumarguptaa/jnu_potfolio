import express from "express";
import { contact } from "../controllers/contect.controller.js";

const router = express.Router();

// Contact form route
router.post("/sendmail", contact);

export default router;