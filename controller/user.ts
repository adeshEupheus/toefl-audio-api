import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import generateRandomCode from "../util/GenSchoolCode";
import jwt from "jsonwebtoken";
import sendEmail from "../util/sendMail";

const prisma = new PrismaClient();

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { schoolName, email, state, city, pin, address } = req.body;

    const alreadyExist = await prisma.schools.findFirst({
      where: {
        OR: [
          {
            schoolName: schoolName,
          },
          {
            email: email,
          },
        ],
      },
    });
    if (alreadyExist) {
      return res
        .status(409)
        .json({ success: false, message: "school already exist" });
    }

    let code = generateRandomCode(6);
    let duplicate = true;

    while (duplicate) {
      const doesSchoolExist = await prisma.schools.findUnique({
        where: {
          schoolCode: code,
        },
      });
      if (doesSchoolExist) {
        code = generateRandomCode(6);
      } else if (!doesSchoolExist) {
        duplicate = false;
      }
    }

    const newSchool = await prisma.schools.create({
      data: {
        schoolName,
        email,
        address,
        city,
        pin,
        state,
        schoolCode: code,
        expireStart: new Date(),
        expireAt: new Date(2023, 11, 20),
      },
    });
    if (!newSchool) {
      return res.status(500).send("something went wrong");
    }
    await sendEmail(newSchool.email, newSchool.schoolCode);
    return res.status(200).send("School created successfully");
  } catch (error) {
    console.log(error);

    return res.status(500).send("server error");
  }
};

export const Login: RequestHandler = async (req, res) => {
  try {
    const { schoolCode } = req.body;
    if (!schoolCode) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide school code" });
    }
    // check if it is a admin
    const admin = await prisma.admin.findFirst({
      where: {
        loginCode: schoolCode,
      },
    });
    if (admin) {
      const token = jwt.sign({ admin: true }, `${process.env.JWT_SECRET_KEY}`, {
        expiresIn: process.env.JWT_LIFETIME,
      });
      return res.status(200).json({ success: true, token });
    } else {
      const doesSchoolExist = await prisma.schools.findUnique({
        where: {
          schoolCode: schoolCode,
        },
      });
      if (!doesSchoolExist) {
        return res
          .status(400)
          .json({ success: false, message: "School Not Found" });
      }

      const token = jwt.sign(
        { schoolId: doesSchoolExist.id },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: process.env.JWT_LIFETIME }
      );
      return res.status(200).json({ success: true, token });
    }
  } catch (error) {
    return res.status(500).send("server error");
  }
};
