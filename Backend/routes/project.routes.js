import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

const projectrouter = express.Router();

projectrouter.post("/createproject", createProject);
projectrouter.get("/getallproject", getProjects);
projectrouter.get("/getproject/:id", getProjectById);
projectrouter.put("/updateproject/:id", updateProject);
projectrouter.delete("/deleteproject/:id", deleteProject);

export default projectrouter;
  