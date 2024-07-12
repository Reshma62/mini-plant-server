"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/Category.ts
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true },
    categoryImage: { type: String, required: true },
});
const CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
exports.default = CategoryModel;
