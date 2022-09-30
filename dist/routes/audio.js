"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const audio_1 = require("../controller/audio");
const router = express_1.default.Router();
router.route("/").post(audio_1.createAudio).get(audio_1.getAll);
exports.default = router;
