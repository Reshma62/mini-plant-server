"use strict";
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
exports.getProductByIdController = exports.getAllProductController = exports.deleteProductController = exports.updateProductController = exports.createProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const createProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, product_service_1.createProductService)(data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Product is created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createProductController = createProductController;
const updateProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = yield (0, product_service_1.updateProductService)(id, data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Product is updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateProductController = updateProductController;
const deleteProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, product_service_1.deleteProductService)(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Product is deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProductController = deleteProductController;
const getAllProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, product_service_1.getAllProductsService)();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "All Products is fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllProductController = getAllProductController;
const getProductByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, product_service_1.getProductByIdService)(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: " is created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProductByIdController = getProductByIdController;
