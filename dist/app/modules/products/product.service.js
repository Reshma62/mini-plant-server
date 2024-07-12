"use strict";
// services/productService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByIdService = exports.getAllProductsService = exports.deleteProductService = exports.updateProductService = exports.createProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProductService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield product_model_1.default.findOne({ title: payload.title });
    if (existingProduct) {
        throw new Error("Product with this title already exists");
    }
    const result = yield product_model_1.default.create(payload);
    return result;
});
exports.createProductService = createProductService;
const updateProductService = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield product_model_1.default.findById(productId);
    if (!existingProduct) {
        throw new Error("Product not found");
    }
    // Check if updating to a new title that already exists
    if (payload.title) {
        const duplicateProduct = yield product_model_1.default.findOne({
            title: payload.title,
            _id: { $ne: productId },
        });
        if (duplicateProduct) {
            throw new Error("Product with this title already exists");
        }
    }
    // Perform the update
    const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productId, payload, { new: true });
    return updatedProduct;
});
exports.updateProductService = updateProductService;
const deleteProductService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield product_model_1.default.findById(productId);
    if (!existingProduct) {
        throw new Error("Product not found");
    }
    const deletedProduct = yield product_model_1.default.findByIdAndDelete(productId);
    return deletedProduct;
});
exports.deleteProductService = deleteProductService;
const getAllProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({});
    return products;
});
exports.getAllProductsService = getAllProductsService;
const getProductByIdService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
});
exports.getProductByIdService = getProductByIdService;
