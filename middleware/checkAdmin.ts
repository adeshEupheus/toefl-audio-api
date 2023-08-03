// import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";

export const checkAdmin: RequestHandler = (req, res, next) => {
  try {
    if (req?.admin) {
      next();
    } else {
      res.status(403).json({ success: false, message: "require admin role" });
    }

    // next();
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
