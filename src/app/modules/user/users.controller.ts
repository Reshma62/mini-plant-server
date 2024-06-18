import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { createUserService, loginUserService } from "./users.service";

export const CreateUserController: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await createUserService(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const LoginUserController: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await loginUserService(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in  successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
