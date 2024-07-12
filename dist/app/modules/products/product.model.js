"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/Product.ts
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    category: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });
const ProductModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = ProductModel;
