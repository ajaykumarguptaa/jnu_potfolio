import express from "express";
import {
  addPhoto,
  getPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto
} from "../controllers/photoGallery.controller.js";
import upload from "../middleware/multer.middleware.js";


const photoGallery = express.Router();

photoGallery.post("/add", upload.single("photo_gallery"), addPhoto);
photoGallery.get("/all", getPhotos);
photoGallery.get("/:id", getPhotoById);
photoGallery.put("/update/:id",upload.single("photo_gallery"), updatePhoto);
photoGallery.delete("/delete/:id", deletePhoto);

export default photoGallery;