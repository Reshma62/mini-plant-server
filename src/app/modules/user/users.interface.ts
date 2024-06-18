/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  needsPasswordChange: string;
  passwordChangedAt: Date;
  role: "admin" | "user";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

// Instance methods and static methods both
export interface IUserMethods {
  comparePassword(enteredPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export interface IUserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  checkExistUser(email: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}

// Static methods

// export interface IUserModel extends Model<IUser> {
//   checkExistUser(email: string): Promise<boolean>;
// }

// export interface IUserMethods {
//   comparePassword(enteredPassword: string): Promise<boolean>;
// }
