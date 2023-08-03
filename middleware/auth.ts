import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";

export const auth: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "Authentication Invalid" });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(
      token,
      `${process.env.JWT_SECRET_KEY}`
    ) as JwtPayload;

    req.schoolId = { schoolId: payload?.schoolId };
    if (payload?.admin) {
      req.admin = payload?.admin;
    }

    next();
  } catch (error) {
    res.status(401).json({ msg: "Authentication Invalid" });
  }
};
