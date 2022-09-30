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
exports.updateUser = exports.getSingleUser = exports.deleteUser = exports.getAllUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        let password = req.body.password;
        const salt = bcryptjs_1.default.genSaltSync(10);
        password = bcryptjs_1.default.hashSync(password, salt);
        const newUser = yield prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_LIFETIME });
        res.status(201).json({ id: newUser.id, token: token });
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.createUser = createUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getAllUser = getAllUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({ msg: "user has been deleted" });
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.deleteUser = deleteUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(user);
    }
    catch (error) { }
});
exports.getSingleUser = getSingleUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedUser = yield prisma.user.update({
            where: {
                id: Number(id),
            },
            data: req.body,
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.updateUser = updateUser;
