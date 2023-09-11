import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../util/sendMail";

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { schoolCode, fullName, userName, email, password, grade } = req.body;

    const checkSchool = await prisma.schools.findUnique({
      where: {
        schoolCode,
      },
    });

    if (!checkSchool) {
      return res
        .status(400)
        .json({ msg: "School Code is not valid", success: false });
    }

    const duplicate = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: email,
          },
          {
            userName: userName,
          },
        ],
      },
    });

    if (duplicate.length > 0) {
      return res
        .status(409)
        .json({ msg: "user already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        gradeId: grade,
        fullName,
        userName,
        schoolId: checkSchool.id,
      },
    });
    return res.status(200).json({ success: true, message: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide username and password" });
    }

    const user = await prisma.user.findMany({
      where: {
        OR: [{ userName: userName }, { email: userName }],
      },
    });

    if (user.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user[0].id },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

export const request_resetPassword: RequestHandler = async (req, res) => {
  try {
    const { userNameEmail } = req.body;

    if (!userNameEmail) {
      throw new Error("Please provide credential");
    }

    const user = await prisma.user.findMany({
      where: {
        OR: [{ userName: userNameEmail }, { email: userNameEmail }],
      },
    });

    if (user.length === 0) {
      throw new Error("User not found");
    }

    const token = await prisma.restPasswordToken.findMany({
      where: {
        userId: user[0].id,
      },
    });
    if (token.length > 0) {
      await prisma.restPasswordToken.deleteMany({
        where: {
          id: token[0].id,
        },
      });
    }
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);
    console.log(new Date(Date.now() + 60 * 60 * 1000).toLocaleString());

    const newToken = await prisma.restPasswordToken.create({
      data: {
        userId: user[0].id,
        token: hash,
        expireTime: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    if (!newToken) {
      throw new Error("Could not create token");
    }

    const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user[0].id}`;
    const sendEmail = await sendResetPasswordEmail(user[0].email, link);

    if (!sendEmail) {
      throw new Error("Could not send email");
    }

    return res
      .status(200)
      .json({ success: true, msg: "Password reset link sent to your email" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    } else {
      console.error("An unknown error occurred:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};
export const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { token, userId, password } = req.body;

    const passwordRestToken = await prisma.restPasswordToken.findFirst({
      where: {
        userId: userId,
      },
    });

    if (
      !passwordRestToken ||
      passwordRestToken.expireTime < new Date(Date.now())
    ) {
      return res.status(400).json({ msg: "Invalid token", success: false });
    }

    const isValid = await bcrypt.compare(token, passwordRestToken.token);
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid token", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashPassword,
      },
    });

    if (!updatedUser) {
      throw new Error("Could not update password");
    }

    const deleteToken = await prisma.restPasswordToken.delete({
      where: {
        id: passwordRestToken.id,
      },
    });

    if (!deleteToken) {
      throw new Error("Could not delete token");
    }

    return res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    } else {
      console.error("An unknown error occurred:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};
