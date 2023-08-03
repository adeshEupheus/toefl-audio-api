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
exports.Login = exports.signUp = void 0;
const client_1 = require("@prisma/client");
const GenSchoolCode_1 = __importDefault(require("../util/GenSchoolCode"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMail_1 = __importDefault(require("../util/sendMail"));
const prisma = new client_1.PrismaClient();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolName, email, state, city, pin, address } = req.body;
        const alreadyExist = yield prisma.schools.findFirst({
            where: {
                OR: [
                    {
                        schoolName: schoolName,
                    },
                    {
                        email: email,
                    },
                ],
            },
        });
        if (alreadyExist) {
            return res
                .status(409)
                .json({ success: false, message: "school already exist" });
        }
        let code = (0, GenSchoolCode_1.default)(6);
        let duplicate = true;
        while (duplicate) {
            const doesSchoolExist = yield prisma.schools.findUnique({
                where: {
                    schoolCode: code,
                },
            });
            if (doesSchoolExist) {
                code = (0, GenSchoolCode_1.default)(6);
            }
            else if (!doesSchoolExist) {
                duplicate = false;
            }
        }
        const newSchool = yield prisma.schools.create({
            data: {
                schoolName,
                email,
                address,
                city,
                pin,
                state,
                schoolCode: code,
                expireStart: new Date(),
                expireAt: new Date(2023, 11, 20),
            },
        });
        if (!newSchool) {
            return res.status(500).send("something went wrong");
        }
        yield (0, sendMail_1.default)(newSchool.email, newSchool.schoolCode);
        return res.status(200).send("School created successfully");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("server error");
    }
});
exports.signUp = signUp;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolCode } = req.body;
        if (!schoolCode) {
            return res
                .status(400)
                .json({ success: false, message: "Please provide school code" });
        }
        // check if it is a admin
        const admin = yield prisma.admin.findFirst({
            where: {
                loginCode: schoolCode,
            },
        });
        if (admin) {
            const token = jsonwebtoken_1.default.sign({ admin: true }, `${process.env.JWT_SECRET_KEY}`, {
                expiresIn: process.env.JWT_LIFETIME,
            });
            return res.status(200).json({ success: true, token });
        }
        else {
            const doesSchoolExist = yield prisma.schools.findUnique({
                where: {
                    schoolCode: schoolCode,
                },
            });
            if (!doesSchoolExist) {
                return res
                    .status(400)
                    .json({ success: false, message: "School Not Found" });
            }
            const token = jsonwebtoken_1.default.sign({ schoolId: doesSchoolExist.id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_LIFETIME });
            return res.status(200).json({ success: true, token });
        }
    }
    catch (error) {
        return res.status(500).send("server error");
    }
});
exports.Login = Login;
