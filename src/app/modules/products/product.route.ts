import { Router } from "express";
const _ = Router();
// controller
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductByIdController,
  updateProductController,
} from "./product.controller";
import { ValidateDataSchema } from "../../middleware/ValidateDataSchema";
import { createProductSchema, updateProductSchema } from "./product.validation";

// routes
_.post("/", ValidateDataSchema(createProductSchema), createProductController);
_.patch(
  "/:id",
  ValidateDataSchema(updateProductSchema),
  updateProductController
);
_.get("/", getAllProductController);
_.get("/:id", getProductByIdController);
_.delete("/:id", deleteProductController);

export const productRoutes = _;
