import express from "express";
import {
  createAward,
  getAwards,
  updateAward,
  deleteAward
} from "../controllers/Award_Honor.controller.js";

const awardrouter = express.Router();

awardrouter.post("/AddAward", createAward);
awardrouter.get("/GetAwards", getAwards);
awardrouter.put("/UpdateAward/:id", updateAward);
awardrouter.delete("/DeleteAward/:id", deleteAward);

export default awardrouter;