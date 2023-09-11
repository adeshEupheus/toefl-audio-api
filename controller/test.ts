import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTest: RequestHandler = async (req, res) => {
  const { Title, category, startTime, endTime } = req.body;
  try {
    const newTest = await prisma.test.create({
      data: {
        Title,
        category,
        startTime,
        endTime,
      },
    });
    if (!newTest) {
      return res.status(500).send("something went wrong");
    }
    res.status(200).json(newTest);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getAll: RequestHandler = async (req, res) => {
  try {
    const allTest = await prisma.test.findMany();
    res.status(200).json(allTest);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "something went wrong" });
  }
};
export const getTestByCategory: RequestHandler = async (req, res) => {
  try {
    const { category } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    const tests = await prisma.test.findMany({
      where: {
        category,
        grades: {
          some: {
            id: user?.gradeId,
          },
        },
      },
    });
    res.status(200).json({ success: true, message: tests });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "something went wrong" });
  }
};
