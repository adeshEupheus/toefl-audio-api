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
exports.getSingleSchool = exports.getAllSchools = exports.createSchool = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield prisma.schools.create({
            data: req.body,
        });
        res.status(200).json(school);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.createSchool = createSchool;
const getAllSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSchools = yield prisma.schools.findMany();
        res.status(200).json(allSchools);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getAllSchools = getAllSchools;
const getSingleSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = req.params.coupon;
        const school = yield prisma.schools.findUnique({
            where: {
                coupon: coupon,
            },
        });
        res.status(200).json(school);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getSingleSchool = getSingleSchool;
