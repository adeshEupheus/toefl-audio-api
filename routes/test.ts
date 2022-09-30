import express from "express";
import { createTest, getAll } from "../controller/test";

const router = express.Router();

router.route("/").post(createTest).get(getAll);

export default router;
