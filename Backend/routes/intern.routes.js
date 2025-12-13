import express from "express";
import upload from "../middleware/multer.middleware.js";
import {
  createIntern,
  getInterns,
  getInternById,
  updateIntern,
  deleteIntern,
} from "../controllers/Intern.controller.js";

const internrouter = express.Router();

internrouter.post("/create", upload.single("profile_picture"), createIntern);
internrouter.get("/", getInterns);
internrouter.get("/:id", getInternById);
internrouter.put("/update/:id", upload.single("profile_picture"), updateIntern);
internrouter.delete("/delete/:id", deleteIntern);

export default internrouter;
