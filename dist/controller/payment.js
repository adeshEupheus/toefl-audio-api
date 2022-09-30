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
exports.createPayment = exports.payment = void 0;
const shortid_1 = require("shortid");
const razorpay_1 = __importDefault(require("razorpay"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment_capture = 1;
    const amount = req.body.price;
    const currency = "INR";
    const options = {
        amount: amount * 100,
        currency,
        receipt: (0, shortid_1.generate)(),
        payment_capture,
    };
    try {
        const razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const response = yield razorpay.orders.create(options);
        console.log(response);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.payment = payment;
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const payment = yield prisma.payment.create({
            data: req.body,
        });
        res.status(200).json(payment);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.createPayment = createPayment;
