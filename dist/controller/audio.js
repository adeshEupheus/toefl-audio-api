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
exports.getAudioByTest = exports.getAll = exports.createAudio = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Title, Url, TestId } = req.body;
        const audio = yield prisma.audio.create({
            data: {
                Title,
                Url,
                TestId,
            },
        });
        res.status(200).json(audio);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(error);
    }
});
exports.createAudio = createAudio;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAudio = yield prisma.audio.findMany();
        res.status(200).json(allAudio);
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(error);
    }
});
exports.getAll = getAll;
const getAudioByTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { testId } = req.params;
        const allAudio = yield prisma.audio.findMany({
            where: {
                TestId: testId,
            },
        });
        res.status(200).json({ success: true, message: allAudio });
    }
    catch (error) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(error);
    }
});
exports.getAudioByTest = getAudioByTest;
