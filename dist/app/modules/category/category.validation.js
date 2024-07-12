"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    categoryName: zod_1.z.string({ required_error: "Category name is required" }),
    categoryImage: zod_1.z.string({ required_error: "Category image is required" }),
});
exports.updateCategorySchema = zod_1.z.object({
    categoryName: zod_1.z
        .string({ required_error: "Category name is required" })
        .optional(),
    categoryImage: zod_1.z
        .string({ required_error: "Category image is required" })
        .optional(),
});
