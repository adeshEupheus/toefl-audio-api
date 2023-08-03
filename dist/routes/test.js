"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = require("../controller/test");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
router.route("/").post(validate_1.validateTest, test_1.createTest);
router.route("/getTest/:category").get(test_1.getTestByCategory);
exports.default = router;
