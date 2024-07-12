import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { RequestHandler } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "./product.service";

export const createProductController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    const result = await createProductService(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProductController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const result = await updateProductService(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProductController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result = await deleteProductService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllProductController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const query = req.query;
    const result = await getAllProductsService(query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Products is fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getProductByIdController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const result = await getProductByIdService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
