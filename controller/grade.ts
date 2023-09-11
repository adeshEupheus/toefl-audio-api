import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllGrades: RequestHandler = async (req, res) => {
  try {
    const allGrade = await prisma.grade.findMany();
    return res.status(200).json({ success: true, message: allGrade });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "something went wrong", success: false });
  }
};
