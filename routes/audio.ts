import express from "express";
import { createAudio, getAudioByTest } from "../controller/audio";
import { validateAudio } from "../middleware/validate";
import { checkAdmin } from "../middleware/checkAdmin";

const router = express.Router();

router.route("/").post(checkAdmin, validateAudio, createAudio);
router.route("/getAudiosByTest/:testId").get(getAudioByTest);

export default router;
