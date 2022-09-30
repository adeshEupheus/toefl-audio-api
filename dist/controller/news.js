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
exports.deleteNews = exports.upadateNews = exports.getSingleNews = exports.getAllNews = exports.createNews = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield prisma.news.create({
            data: req.body,
        });
        res.status(200).json(news);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(error);
        // res.json(error)
    }
});
exports.createNews = createNews;
const getAllNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNews = yield prisma.news.findMany();
        res.status(200).json(allNews);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getAllNews = getAllNews;
const getSingleNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const news = yield prisma.news.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(news);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.getSingleNews = getSingleNews;
const upadateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedNews = yield prisma.news.update({
            where: {
                id: Number(id),
            },
            data: req.body,
        });
        res.status(200).json(updatedNews);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.upadateNews = upadateNews;
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield prisma.news.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({ msg: "news has been deleted" });
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
    }
});
exports.deleteNews = deleteNews;
