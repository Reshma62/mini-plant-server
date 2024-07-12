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
exports.getAllCategoryController = exports.categoryDeleteController = exports.updateCategoryController = exports.crateCategoryController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const category_service_1 = require("./category.service");
const crateCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, category_service_1.createCategoryService)(data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Category is created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.crateCategoryController = crateCategoryController;
const updateCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const data = req.body;
        const result = yield (0, category_service_1.updateCategoryService)(categoryId, data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Category is updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCategoryController = updateCategoryController;
const categoryDeleteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const result = yield (0, category_service_1.deleteCategoryService)(categoryId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "category is deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.categoryDeleteController = categoryDeleteController;
const getAllCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, category_service_1.getAllCategoryService)();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Category are retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCategoryController = getAllCategoryController;
