import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAudio: RequestHandler = async (req, res) => {
  try {
    const audio = await prisma.audio.create({
      data: req.body,
    });
    res.status(200).json(audio);
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
    console.log(error);
  }
};

export const getAll: RequestHandler = async (req, res) => {
  try {
    const allAudio = await prisma.audio.findMany();
    res.status(200).json(allAudio);
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
    console.log(error);
  }
};
