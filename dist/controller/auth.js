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
exports.login = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ msg: "please provide email and password" });
    }
    const user = yield prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(200).json({ err: "Wrong Email", status: 401 });
    }
    const isPasswordCorrect = bcryptjs_1.default.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(200).json({ err: "Wrong Password", status: 401 });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_LIFETIME });
    return res.status(200).json({ userId: user === null || user === void 0 ? void 0 : user.id, token: token, status: 200 });
});
exports.login = login;
