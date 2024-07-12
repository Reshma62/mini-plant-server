"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// Function to create an access token
const createAccessToken = (user, expiresIn) => {
    const accessToken = jsonwebtoken_1.default.sign({ userEmail: user.userEmail }, config_1.default.accessTokenSecret, {
        expiresIn: expiresIn, // Token expires in 15 minutes
    });
    return accessToken;
};
exports.createAccessToken = createAccessToken;
// Function to create a refresh token
const createRefreshToken = (user) => {
    const refreshToken = jsonwebtoken_1.default.sign({ userEmail: user.userEmail }, config_1.default.refreshTokenSecret, {
        expiresIn: "365d", // Token expires in 7 days
    });
    return refreshToken;
};
exports.createRefreshToken = createRefreshToken;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
