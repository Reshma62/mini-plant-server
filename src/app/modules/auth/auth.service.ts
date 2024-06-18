import bcrypt from "bcrypt";
import { IUser } from "./../user/users.interface";
import { UserModel } from "../user/users.model";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../../utils/token";
import sendEmail from "../../utils/sendEmail";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
// create user service
export const createUserService = async (payload: IUser) => {
  const { email } = payload;
  const existsUser = await UserModel.checkExistUser(email);
  if (existsUser) {
    throw new Error("User already exists");
  }
  const result = await UserModel.create(payload);
  return result;
};
// Login user service
export const loginUserService = async (payload: IUser) => {
  const { email, password } = payload;
  const existsUser = await UserModel.checkExistUser(email);
  if (!existsUser) {
    throw new Error("User does not exist");
  }
  if (existsUser.isDeleted) {
    throw new Error("User has been deleted");
  }
  const matchPassword = await existsUser.comparePassword(password);
  if (!matchPassword) {
    throw new Error("Wrong credentials");
  }

  // Generate tokens and prepend "Bearer "
  const accessToken = `Bearer ${createAccessToken({ userEmail: email }, "1d")}`;
  const refreshToken = `${createRefreshToken({ userEmail: email })}`;

  const loginUser = await UserModel.findOne({ email }).select(
    "name email role address phone"
  );

  return { loginUser, accessToken, refreshToken };
};
// forget password service
export const forgetPasswordService = async (payload: IUser) => {
  const { email } = payload;
  const token = createAccessToken({ userEmail: email }, "5m");
  const generateLink = `http://localhost:3000/forget-password?email=${email}&token=${token}`;
  console.log(generateLink);
  const existsUser = await UserModel.checkExistUser(email);
  if (!existsUser) {
    throw new Error("User does not exist");
  }
  if (existsUser.isDeleted) {
    throw new Error("User has been deleted");
  }
  await sendEmail(existsUser.email, generateLink);
  return existsUser;
};
// reset password service

export const resetPasswordService = async (
  payload: { email: string; newPassword: string },
  token: string
) => {
  const existsUser = await UserModel.checkExistUser(payload.email);
  if (!existsUser) {
    throw new Error("User does not exist");
  }
  if (existsUser.isDeleted) {
    throw new Error("User has been deleted");
  }

  // verify token

  const decode = verifyToken(token, config.accessTokenSecret);

  if (decode.userEmail !== payload.email) {
    throw new Error("Invalid token");
  }
  const hashPass = await bcrypt.hash(payload.newPassword, 12);
  await UserModel.findOneAndUpdate(
    { email: payload.email },
    { password: hashPass }
  );
  return null;
};

// change password service

export const changePasswordService = async (
  payload: { oldPassword: string; newPassword: string },
  user: JwtPayload
) => {
  console.log(user, "user");
  const result = await UserModel.checkExistUser(user.email);
  if (!result) {
    throw new Error("User does not exist");
  }
  if (result.isDeleted) {
    throw new Error("User has been deleted");
  }
  const matchPassword = await result.comparePassword(payload.oldPassword);
  if (!matchPassword) {
    throw new Error("Wrong credentials");
  }
  const hashPass = await bcrypt.hash(payload.newPassword, 12);
  await UserModel.findOneAndUpdate(
    { email: user.email },
    { password: hashPass }
  );
  return result;
};
// refresh token service

export const refreshTokenService = async (token: string) => {
  const decode = verifyToken(token, config.refreshTokenSecret);
  const result = await UserModel.checkExistUser(decode.userEmail);
  console.log(result, "result");
  if (!result) {
    throw new Error("User does not exist");
  }
  if (result.isDeleted) {
    throw new Error("User has been deleted");
  }
  if (
    result.passwordChangedAt &&
    result.isJWTIssuedBeforePasswordChanged(
      result.passwordChangedAt,
      decode.iat as number
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const accessToken = `Bearer ${createAccessToken(
    { userEmail: result.email },
    "1d"
  )}`;
  return accessToken;
};
