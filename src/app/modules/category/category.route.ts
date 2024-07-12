import { Router } from "express";
import {
  categoryDeleteController,
  crateCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "./category.controller";
import { ValidateDataSchema } from "../../middleware/ValidateDataSchema";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";
const _ = Router();
// controller
_.post("/", ValidateDataSchema(createCategorySchema), crateCategoryController);
_.patch(
  "/:id",
  ValidateDataSchema(updateCategorySchema),
  updateCategoryController
);
_.delete("/:id", categoryDeleteController);
_.get("/", getAllCategoryController);
// routes

export const categoryRoutes = _;
