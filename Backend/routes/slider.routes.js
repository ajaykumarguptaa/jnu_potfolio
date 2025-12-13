import express from "express";
import {
  createSlider,
  getSliders,
  getSliderById,
  updateSlider,
  deleteSlider
} from "../controllers/slider.controller.js";
import upload from "../middleware/multer.middleware.js";

const sliderRouter = express.Router();

sliderRouter.post("/addSlider",upload.single("slider"), createSlider);
sliderRouter.get("/getSliders", getSliders);
sliderRouter.get("/getSlider/:id", getSliderById);
sliderRouter.put("/updateSlider/:id",upload.single("slider"), updateSlider);
sliderRouter.delete("/deleteSlider/:id", deleteSlider);

export default sliderRouter;
