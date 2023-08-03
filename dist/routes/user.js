"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
router.route("/signUp").post(validate_1.validateSchool, user_1.signUp);
router.route("/login").post(user_1.Login);
exports.default = router;
