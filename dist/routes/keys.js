"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.route("/").get((req, res) => {
    try {
        res.status(200).json({
            accessKey: process.env.ACCESS_KEY,
            secretKey: process.env.SECRET_KEY,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.route("/razorpay").get((req, res) => {
    try {
        res.status(200).json({
            key: process.env.RAZORPAY_KEY,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
