"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const school_1 = require("../controller/school");
const router = express_1.default.Router();
router.route("/getSchoolInfo").get(school_1.getSchoolInfo);
exports.default = router;
