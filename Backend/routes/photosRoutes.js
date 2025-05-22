import express from "express";
import upload from "../middlewares/upload.js";
import PhotosController from "../controllers/photosController.js";
import authUser from "../middlewares/authUser.js";

const photosRoutes = express.Router();

photosRoutes.post('/', authUser, upload.single('avatar'), PhotosController.uploadPhoto)
photosRoutes.get('/:id', PhotosController.getPhoto)
export default photosRoutes;