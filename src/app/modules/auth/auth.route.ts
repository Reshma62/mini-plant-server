import { Router } from "express";
const _ = Router();
// controller
import {
  changePasswordController,
  createUserController,
  forgetPasswordController,
  loginController,
  resetPasswordController,
} from "./auth.controller";
import { ValidateDataSchema } from "../../middleware/ValidateDataSchema";
import {
  changePasswordSchema,
  forgetPasswordSchema,
  loginUserValidationSchema,
  resetPasswordSchema,
  signupUserSchema,
} from "./auth.validation";
import auth from "../../middleware/auth/auth";
//  routes
_.post("/signup", ValidateDataSchema(signupUserSchema), createUserController);
_.post(
  "/login",
  ValidateDataSchema(loginUserValidationSchema),
  loginController
);
_.post(
  "/forget-password",
  ValidateDataSchema(forgetPasswordSchema),
  forgetPasswordController
);
_.post(
  "/reset-password",
  ValidateDataSchema(resetPasswordSchema),
  resetPasswordController
);

_.post(
  "/change-password",
  ValidateDataSchema(changePasswordSchema),
  auth("admin", "user"),
  changePasswordController
);
_.post("/refresh-token");

export const AuthRoutes = _;
