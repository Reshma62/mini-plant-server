"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const _ = (0, express_1.Router)();
// controller
const product_controller_1 = require("./product.controller");
const ValidateDataSchema_1 = require("../../middleware/ValidateDataSchema");
const product_validation_1 = require("./product.validation");
// routes
_.post("/", (0, ValidateDataSchema_1.ValidateDataSchema)(product_validation_1.createProductSchema), product_controller_1.createProductController);
_.patch("/:id", (0, ValidateDataSchema_1.ValidateDataSchema)(product_validation_1.updateProductSchema), product_controller_1.createProductController);
_.get("/", product_controller_1.getAllProductController);
_.get("/:id", product_controller_1.getProductByIdController);
_.delete("/:id", product_controller_1.deleteProductController);
exports.productRoutes = _;
