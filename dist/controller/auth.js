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
exports.resetPassword = exports.request_resetPassword = exports.login = exports.signUp = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const sendMail_1 = require("../util/sendMail");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolCode, fullName, userName, email, password, grade } = req.body;
        const checkSchool = yield prisma.schools.findUnique({
            where: {
                schoolCode,
            },
        });
        if (!checkSchool) {
            return res
                .status(400)
                .json({ msg: "School Code is not valid", success: false });
        }
        const duplicate = yield prisma.user.findMany({
            where: {
                OR: [
                    {
                        email: email,
                    },
                    {
                        userName: userName,
                    },
                ],
            },
        });
        if (duplicate.length > 0) {
            return res
                .status(409)
                .json({ msg: "user already exists", success: false });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                email,
                password: hashPassword,
                gradeId: grade,
                fullName,
                userName,
                schoolId: checkSchool.id,
            },
        });
        return res.status(200).json({ success: true, message: newUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong" });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res
                .status(400)
                .json({ msg: "Please provide username and password" });
        }
        const user = yield prisma.user.findMany({
            where: {
                OR: [{ userName: userName }, { email: userName }],
            },
        });
        if (user.length === 0) {
            return res.status(400).json({ msg: "User not found" });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ msg: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user[0].id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_LIFETIME });
        return res.status(200).json({ success: true, token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong" });
    }
});
exports.login = login;
const request_resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userNameEmail } = req.body;
        if (!userNameEmail) {
            throw new Error("Please provide credential");
        }
        const user = yield prisma.user.findMany({
            where: {
                OR: [{ userName: userNameEmail }, { email: userNameEmail }],
            },
        });
        if (user.length === 0) {
            throw new Error("User not found");
        }
        const token = yield prisma.restPasswordToken.findMany({
            where: {
                userId: user[0].id,
            },
        });
        if (token.length > 0) {
            yield prisma.restPasswordToken.deleteMany({
                where: {
                    id: token[0].id,
                },
            });
        }
        let resetToken = crypto_1.default.randomBytes(32).toString("hex");
        const hash = yield bcrypt_1.default.hash(resetToken, 10);
        console.log(new Date(Date.now() + 60 * 60 * 1000).toLocaleString());
        const newToken = yield prisma.restPasswordToken.create({
            data: {
                userId: user[0].id,
                token: hash,
                expireTime: new Date(Date.now() + 60 * 60 * 1000),
            },
        });
        if (!newToken) {
            throw new Error("Could not create token");
        }
        const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user[0].id}`;
        const sendEmail = yield (0, sendMail_1.sendResetPasswordEmail)(user[0].email, link);
        if (!sendEmail) {
            throw new Error("Could not send email");
        }
        return res
            .status(200)
            .json({ success: true, msg: "Password reset link sent to your email" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
        else {
            console.error("An unknown error occurred:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }
});
exports.request_resetPassword = request_resetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, userId, password } = req.body;
        const passwordRestToken = yield prisma.restPasswordToken.findFirst({
            where: {
                userId: userId,
            },
        });
        if (!passwordRestToken ||
            passwordRestToken.expireTime < new Date(Date.now())) {
            return res.status(400).json({ msg: "Invalid token", success: false });
        }
        const isValid = yield bcrypt_1.default.compare(token, passwordRestToken.token);
        if (!isValid) {
            return res.status(400).json({ msg: "Invalid token", success: false });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const updatedUser = yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password: hashPassword,
            },
        });
        if (!updatedUser) {
            throw new Error("Could not update password");
        }
        const deleteToken = yield prisma.restPasswordToken.delete({
            where: {
                id: passwordRestToken.id,
            },
        });
        if (!deleteToken) {
            throw new Error("Could not delete token");
        }
        return res
            .status(200)
            .json({ message: "Password updated successfully", success: true });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
        else {
            console.error("An unknown error occurred:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }
});
exports.resetPassword = resetPassword;
