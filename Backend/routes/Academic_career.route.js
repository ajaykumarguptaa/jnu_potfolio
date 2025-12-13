import express from "express";
import {
  createAcademicCareer,
  getAcademicCareers,
  updateAcademicCareer,
  deleteAcademicCareer
} from "../controllers/Academic_career.controller.js";

const academicCareerRouter = express.Router();

academicCareerRouter.post("/AddAcademicCareer", createAcademicCareer);
academicCareerRouter.get("/GetAcademicCareers", getAcademicCareers);
academicCareerRouter.put("/UpdateAcademicCareer/:id", updateAcademicCareer);
academicCareerRouter.delete("/DeleteAcademicCareer/:id", deleteAcademicCareer);

export default academicCareerRouter;