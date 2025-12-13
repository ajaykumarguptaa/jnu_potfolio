import express from "express";
import {
  getExperiences,
  createExperience,
  deleteExperience
} from "../controllers/experience.controller.js";

const experiencerouter = express.Router();

experiencerouter.get("/", getExperiences);
experiencerouter.post("/", createExperience);
experiencerouter.delete("/:id", deleteExperience);

export default experiencerouter;