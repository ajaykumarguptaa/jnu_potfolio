import express from "express";
import {getAdmin,createAdmin, deleteAdmin} from "../controllers/admin.controller.js"
import upload from "../middleware/multer.middleware.js";

const adminrouter = express.Router();

adminrouter.get("/", getAdmin);
adminrouter.post("/",upload.single("admin_photo"), createAdmin);
adminrouter.put("/:id",upload.single("admin_photo"), createAdmin);
adminrouter.delete("/deleteadmin/:id",deleteAdmin);

export default adminrouter;