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
exports.getSchoolInfo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSchoolInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const getSchoolInfo = yield prisma.schools.findUnique({
            where: {
                id: (_a = req === null || req === void 0 ? void 0 : req.schoolId) === null || _a === void 0 ? void 0 : _a.schoolId,
            },
        });
        res.status(200).json({ success: true, message: getSchoolInfo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getSchoolInfo = getSchoolInfo;
