import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTest: RequestHandler = async (req, res) => {
  try {
    const newTest = await prisma.test.create({
      data: req.body,
    });
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
