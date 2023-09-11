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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestByCategory = exports.getAll = exports.createTest = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Title, category, startTime, endTime } = req.body;
    try {
        const newTest = yield prisma.test.create({
            data: {
                Title,
                category,
                startTime,
                endTime,
            },
        });
        if (!newTest) {
            return res.status(500).send("something went wrong");
        }
        res.status(200).json(newTest);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.createTest = createTest;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTest = yield prisma.test.findMany();
        res.status(200).json(allTest);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getAll = getAll;
const getTestByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const user = yield prisma.user.findUnique({
            where: {
                id: req.userId,
            },
        });
        const tests = yield prisma.test.findMany({
            where: {
                category,
                grades: {
                    some: {
                        id: user === null || user === void 0 ? void 0 : user.gradeId,
                    },
                },
            },
        });
        res.status(200).json({ success: true, message: tests });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getTestByCategory = getTestByCategory;
