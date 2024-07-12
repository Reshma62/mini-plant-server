"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const users_model_1 = require("../../modules/user/users.model");
const auth = (...allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(allowedRoles, "allowedRoles");
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return next(new Error("You have no access to this route"));
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.accessTokenSecret);
            const user = yield users_model_1.UserModel.findOne({ email: decoded.userEmail });
            if (!user) {
                return next(new Error("User does not exist"));
            }
            if (allowedRoles && !allowedRoles.includes(user.role)) {
                return next(new Error("You have no access to this route"));
            }
            req.user = user;
            console.log(user, "auth user");
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
