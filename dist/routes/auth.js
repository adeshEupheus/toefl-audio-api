"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const auth_1 = require("../controller/auth");
const router = express_1.default.Router();
router.route("/signUp").post(validate_1.validateUser, auth_1.signUp);
router.route("/login").post(auth_1.login);
router.route("/request_reset_password").post(auth_1.request_resetPassword);
router.route("/reset_password").post(auth_1.resetPassword);
exports.default = router;
