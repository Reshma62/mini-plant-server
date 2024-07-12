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
exports.getAllCategoryService = exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const createCategoryService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if category already exists by categoryName
    const existingCategory = yield category_model_1.default.findOne({
        categoryName: payload.categoryName,
    });
    if (existingCategory) {
        throw new Error("Category with this name already exists");
    }
    const result = yield category_model_1.default.create(payload);
    return result;
});
exports.createCategoryService = createCategoryService;
const updateCategoryService = (categoryId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if category exists
    const existingCategory = yield category_model_1.default.findById(categoryId);
    if (!existingCategory) {
        throw new Error("Category not found");
    }
    // Check if updating to a new categoryName that already exists
    if (payload.categoryName &&
        payload.categoryName !== existingCategory.categoryName) {
        const duplicateCategory = yield category_model_1.default.findOne({
            categoryName: payload.categoryName,
        });
        if (duplicateCategory) {
            throw new Error("Category with this name already exists");
        }
    }
    // Perform the update
    const updatedCategory = yield category_model_1.default.findByIdAndUpdate(categoryId, payload, { new: true });
    return updatedCategory;
});
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if category exists
    const existingCategory = yield category_model_1.default.findById(categoryId);
    if (!existingCategory) {
        throw new Error("Category not found");
    }
    // Perform the delete operation
    const deletedCategory = yield category_model_1.default.findByIdAndDelete(categoryId);
    return deletedCategory;
});
exports.deleteCategoryService = deleteCategoryService;
const getAllCategoryService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.default.find();
    return result;
});
exports.getAllCategoryService = getAllCategoryService;
