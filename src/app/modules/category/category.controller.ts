import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoryService,
  updateCategoryService,
} from "./category.service";

export const crateCategoryController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    console.log(data, "category data");
    const result = await createCategoryService(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategoryController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId, "category id");
    const data = req.body;
    const result = await updateCategoryService(categoryId, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const categoryDeleteController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const categoryId = req.params.id;
    const result = await deleteCategoryService(categoryId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "category is deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCategoryController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const query = req.query;
    const result = await getAllCategoryService(query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category are retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
