import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import {
  changePasswordService,
  createUserService,
  forgetPasswordService,
  loginUserService,
  refreshTokenService,
  resetPasswordService,
} from "./auth.service";
// create user controller
export const createUserController: RequestHandler = async (req, res, next) => {
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
// login user controller
export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const { accessToken, refreshToken, loginUser } =
      await loginUserService(data);
    const result = { accessToken, loginUser };
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " User logged in successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// forget password controller
export const forgetPasswordController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    const result = await forgetPasswordService(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Forget password link is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// reset password controller

export const resetPasswordController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;
    console.log(req.headers);
    console.log(token, "token");
    if (!token) {
      throw new Error("Token is required");
    }
    const result = await resetPasswordService(data, token as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Password is reset successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// change password
export const changePasswordController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    console.log(data, "data");
    const user = req.user;
    console.log(user, "user controller");
    const result = await changePasswordService(data, req.user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Password change successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// refresh token controller
export const refreshTokenController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(req.cookies, "req.cookies");
    console.log(refreshToken, "refreshToken");
    const result = await refreshTokenService(refreshToken);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Access token is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};