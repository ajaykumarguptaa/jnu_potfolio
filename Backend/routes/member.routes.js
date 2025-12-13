import express from "express";

import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
} from "../controllers/member.controller.js";
import upload from "../middleware/multer.middleware.js";

const memberrouter = express.Router();

memberrouter.get("/allmember", getMembers);
memberrouter.get("/:id", getMemberById);
memberrouter.post("/",upload.single("member_photo"), createMember);
memberrouter.put("/:id", upload.single("member_photo"), updateMember);
memberrouter.delete("/:id", deleteMember);

export default memberrouter;
