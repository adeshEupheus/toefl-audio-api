import express from "express";

import { validateUser } from "../middleware/validate";
import {
  signUp,
  login,
  request_resetPassword,
  resetPassword,
} from "../controller/auth";

const router = express.Router();

router.route("/signUp").post(validateUser, signUp);
router.route("/login").post(login);
router.route("/request_reset_password").post(request_resetPassword);
router.route("/reset_password").post(resetPassword);

export default router;
