import express from "express";
import { getSchoolInfo } from "../controller/school";

const router = express.Router();

router.route("/getSchoolInfo").get(getSchoolInfo);

export default router;
