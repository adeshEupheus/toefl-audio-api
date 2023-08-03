"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const audio_1 = require("../controller/audio");
const validate_1 = require("../middleware/validate");
const checkAdmin_1 = require("../middleware/checkAdmin");
const router = express_1.default.Router();
router.route("/").post(checkAdmin_1.checkAdmin, validate_1.validateAudio, audio_1.createAudio);
router.route("/getAudiosByTest/:testId").get(audio_1.getAudioByTest);
exports.default = router;
