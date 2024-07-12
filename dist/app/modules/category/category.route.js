"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const ValidateDataSchema_1 = require("../../middleware/ValidateDataSchema");
const category_validation_1 = require("./category.validation");
const _ = (0, express_1.Router)();
// controller
_.post("/", (0, ValidateDataSchema_1.ValidateDataSchema)(category_validation_1.createCategorySchema), category_controller_1.crateCategoryController);
_.patch("/:id", (0, ValidateDataSchema_1.ValidateDataSchema)(category_validation_1.updateCategorySchema), category_controller_1.updateCategoryController);
_.delete("/:id", category_controller_1.categoryDeleteController);
_.get("/", category_controller_1.getAllCategoryController);
// routes
exports.categoryRoutes = _;
