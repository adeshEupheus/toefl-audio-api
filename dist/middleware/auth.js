"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ msg: "Authentication Invalid" });
        }
        const token = authHeader.split(" ")[1];
        const payload = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET_KEY}`);
        req.schoolId = { schoolId: payload === null || payload === void 0 ? void 0 : payload.schoolId };
        if (payload === null || payload === void 0 ? void 0 : payload.admin) {
            req.admin = payload === null || payload === void 0 ? void 0 : payload.admin;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "Authentication Invalid" });
    }
};
exports.auth = auth;
