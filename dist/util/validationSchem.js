"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioSchema = exports.TestSchema = exports.SchoolSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.SchoolSchema = joi_1.default.object({
    schoolName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    pin: joi_1.default.string().length(6).required(),
    address: joi_1.default.string().required(),
});
exports.TestSchema = joi_1.default.object({
    Title: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    startTime: joi_1.default.date().required(),
    endTime: joi_1.default.date().required(),
});
exports.AudioSchema = joi_1.default.object({
    Title: joi_1.default.string().required(),
    Url: joi_1.default.string().required(),
    TestId: joi_1.default.number().required(),
});
