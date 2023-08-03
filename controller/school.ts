import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSchoolInfo: RequestHandler = async (req, res) => {
  try {
    const getSchoolInfo = await prisma.schools.findUnique({
      where: {
        id: req?.schoolId?.schoolId,
      },
    });

    res.status(200).json({ success: true, message: getSchoolInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};
