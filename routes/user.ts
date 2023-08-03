import express from "express";
import { Login, signUp } from "../controller/user";
import { validateSchool } from "../middleware/validate";

const router = express.Router();

router.route("/signUp").post(validateSchool, signUp);
router.route("/login").post(Login);

export default router;
