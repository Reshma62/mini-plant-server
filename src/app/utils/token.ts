import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

interface User {
  userEmail: string;
}

// Function to create an access token
export const createAccessToken = (user: User, expiresIn: any): string => {
  const accessToken = jwt.sign(
    { userEmail: user.userEmail },
    config.accessTokenSecret,
    {
      expiresIn: expiresIn, // Token expires in 15 minutes
    }
  );

  return accessToken;
};

// Function to create a refresh token
export const createRefreshToken = (user: User): string => {
  const refreshToken = jwt.sign(
    { userId: user.userEmail },
    config.refreshTokenSecret,
    {
      expiresIn: "365d", // Token expires in 7 days
    }
  );

  return refreshToken;
};

export const verifyToken = (token: string, secret: any) => {
  return jwt.verify(token, secret) as JwtPayload;
};
