import express from "express";

import {
  createOtherActivity,
  getOtherActivities,
  // getOtherActivitiesbyId,
  updateOtherActivity,
  deleteOtherActivity
} from "../controllers/Other_Activity.controller.js";

const otherActivityrouter = express.Router();

otherActivityrouter.post("/addactivities", createOtherActivity);
otherActivityrouter.get("/getallactivities", getOtherActivities);
// otherActivityrouter.get("/getactivities/:id", getOtherActivitiesbyId);
otherActivityrouter.put("/updateactivities/:id", updateOtherActivity);
otherActivityrouter.delete("/deleteactivities/:id", deleteOtherActivity);

export default otherActivityrouter;