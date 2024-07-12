import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { RequestHandler } from "express";
import { createProductService } from "./product.service";

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
