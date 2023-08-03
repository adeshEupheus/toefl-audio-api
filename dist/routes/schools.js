"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schools_1 = require("../controller/schools");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", auth_1.auth, schools_1.getAllSchools);
router.post("/addSchool", auth_1.auth, schools_1.createSchool);
router.route("/:coupon").get(schools_1.getSingleSchool);
exports.default = router;
