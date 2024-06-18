import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { UserModel } from "../../modules/user/users.model";

const auth = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(allowedRoles, "allowedRoles");
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        return next(new Error("You have no access to this route"));
      }

      const decoded = jwt.verify(
        token,
        config.accessTokenSecret as string
      ) as JwtPayload;
      const user = await UserModel.findOne({ email: decoded.userEmail });
      if (!user) {
        return next(new Error("User does not exist"));
      }
      if (allowedRoles && !allowedRoles.includes(user.role as string)) {
        return next(new Error("You have no access to this route"));
      }
      req.user = user;
      console.log(user, "auth user");
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
