"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    category: zod_1.z.string({ required_error: "Category is required" }),
    title: zod_1.z.string({ required_error: "Title is required" }),
    price: zod_1.z
        .number({ required_error: "Price is required" })
        .positive({ message: "Price must be positive" }),
    quantity: zod_1.z
        .number({ required_error: "Quantity is required" })
        .int()
        .nonnegative({ message: "Quantity must be a non-negative integer" }),
    description: zod_1.z.string({ required_error: "Description is required" }),
    rating: zod_1.z
        .number({ required_error: "Rating is required" })
        .min(0, { message: "Rating must be at least 0" })
        .max(5, { message: "Rating must be at most 5" }),
    image: zod_1.z.string({ required_error: "Image is required" }),
});
