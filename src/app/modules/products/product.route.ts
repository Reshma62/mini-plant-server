import { Router } from "express";
import { createProductController } from "./product.controller";
const _ = Router();
// controller
// routes
_.post("/", createProductController);

export const productRoutes = _;
