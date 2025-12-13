import express from 'express'
const adminInfoRoutes = express.Router()

import upload from '../middleware/multer.middleware.js';
import { createAdmininfo, getAdminInfoById, getAllAdminsinfo, updateAdmininfo } from '../controllers/Admininfo.Controller.js';




adminInfoRoutes.get("/", getAllAdminsinfo);
adminInfoRoutes.post("/create", upload.single("profile_picture"),createAdmininfo);
adminInfoRoutes.put("/update/:id", upload.single("profile_picture"),updateAdmininfo);
// adminInfoRoutes.delete("/:id", delet);
adminInfoRoutes.get('/:Id',getAdminInfoById)
export default adminInfoRoutes;
