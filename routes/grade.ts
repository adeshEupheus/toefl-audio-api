import express from "express";
import { getAllGrades } from "../controller/grade";

const router = express.Router();

router.route("/").get(getAllGrades);

export default router;
