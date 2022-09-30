import express from "express";
import { createAudio, getAll } from "../controller/audio";

const router = express.Router();

router.route("/").post(createAudio).get(getAll);

export default router;
