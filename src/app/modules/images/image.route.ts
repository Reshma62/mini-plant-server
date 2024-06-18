import { Router } from "express";
import { upload } from "./image.utils";
import { uploadImageController } from "./image.controller";
const _ = Router();
// controller
// routes
_.post("/single-image-upload", upload.single("file"), uploadImageController);

export const ImagesRoutes = _;
