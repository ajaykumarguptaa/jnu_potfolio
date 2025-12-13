import express from "express";


import {
  createAdministrativeActivity,
  getAdministrativeActivities,
  updateAdministrativeActivity,
  deleteAdministrativeActivity
} from "../controllers/Administrative_position_Activities.controller.js";

const Administrativerouter = express.Router();

Administrativerouter.post("/addactivities", createAdministrativeActivity);
Administrativerouter.get("/getactivities", getAdministrativeActivities);
Administrativerouter.put("/updateactivities/:id", updateAdministrativeActivity);
Administrativerouter.delete("/deleteactivities/:id", deleteAdministrativeActivity);

export default Administrativerouter;