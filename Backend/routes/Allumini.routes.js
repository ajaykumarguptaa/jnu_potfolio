import express from "express";
import upload from "../middleware/multer.middleware.js";




import { createAlumni, deleteMemberAlumni, getAlumni, getAlumniMemberById, updateMemberAlumni } from "../controllers/Allumini.controllers.js";

const alluminirouter = express.Router();

alluminirouter.post("/create", upload.single("profile_picture"), createAlumni);
alluminirouter.get("/get", getAlumni);
alluminirouter.get("/:id",getAlumniMemberById);
alluminirouter.put("/update/:id", upload.single("profile_picture"), updateMemberAlumni);
alluminirouter.delete("/delete/:id", deleteMemberAlumni);

export default alluminirouter;
