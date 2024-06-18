import { IUser } from "./users.interface";
import { UserModel } from "./users.model";
export const createUserService = async (data: IUser) => {
  const { email } = data;
  const existsUser = await UserModel.checkExistUser(email);
  if (existsUser) {
    throw new Error("User already exists");
  }
  const result = await UserModel.create(data);
  return result;
};
export const loginUserService = async (data: IUser) => {
  const { email, password } = data;
  const existsUser = await UserModel.checkExistUser(email);
  if (!existsUser) {
    throw new Error("User does not exist");
  }
  const matchPassword = await existsUser.comparePassword(password);

  if (!matchPassword) {
    throw new Error("Wrong credentials");
  }
  return existsUser;
};
