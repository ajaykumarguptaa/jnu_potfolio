import express from "express";
import {
  getResearch,
  getResearchById,
  createResearch,
  updateResearch,
  deleteResearch
} from "../controllers/research.controller.js";

const researchrouter = express.Router();

researchrouter.post("/AddResearch", createResearch);
researchrouter.get("/GetResearch", getResearch);
researchrouter.get("/GetResearchbyid/:id", getResearchById);
researchrouter.put("/UpdateResearch/:id", updateResearch);
researchrouter.delete("/DeleteResearch/:id", deleteResearch);

export default researchrouter;
