"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const _ = (0, express_1.Router)();
// controller
// routes
_.post("/", product_controller_1.createProductController);
exports.productRoutes = _;
