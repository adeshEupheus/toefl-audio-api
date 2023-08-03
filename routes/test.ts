import express from "express";
import { createTest, getTestByCategory } from "../controller/test";
import { validateTest } from "../middleware/validate";

const router = express.Router();

router.route("/").post(validateTest, createTest);
router.route("/getTest/:category").get(getTestByCategory);

export default router;
