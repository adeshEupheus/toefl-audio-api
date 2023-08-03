"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const news_1 = require("../controller/news");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.default)();
router.route("/").get(news_1.getAllNews).post(auth_1.auth, news_1.createNews);
router
    .route("/:id")
    .get(auth_1.auth, news_1.getSingleNews)
    .put(auth_1.auth, news_1.upadateNews)
    .delete(auth_1.auth, news_1.deleteNews);
exports.default = router;
