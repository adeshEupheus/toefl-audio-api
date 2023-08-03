import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAudio: RequestHandler = async (req, res) => {
  try {
    const { Title, Url, TestId } = req.body;
    const audio = await prisma.audio.create({
      data: {
        Title,
        Url,
        TestId,
      },
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

export const getAudioByTest: RequestHandler = async (req, res) => {
  try {
    const { testId } = req.params;
    const allAudio = await prisma.audio.findMany({
      where: {
        TestId: Number(testId),
      },
    });
    res.status(200).json({ success: true, message: allAudio });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
    console.log(error);
  }
};
