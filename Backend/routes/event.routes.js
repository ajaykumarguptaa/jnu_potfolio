import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller.js";

const eventrouter = express.Router();

eventrouter.get("/allevent", getEvents);
eventrouter.get("/:id", getEventById);
eventrouter.post("/create", createEvent);
eventrouter.put("/update/:id", updateEvent);
eventrouter.delete("/delete/:id", deleteEvent);

export default eventrouter;
