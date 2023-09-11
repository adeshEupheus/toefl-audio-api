import { RequestHandler } from "express";
import {
  AudioSchema,
  SchoolSchema,
  TestSchema,
  userSchema,
} from "../util/validationSchem";

export const validateSchool: RequestHandler = (req, res, next) => {
  const validationResult = SchoolSchema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(200).json({ error: validationResult.error });
  } else {
    next();
  }
};

export const validateTest: RequestHandler = (req, res, next) => {
  const TestResult = TestSchema.validate(req.body);
  if (TestResult.error) {
    console.log(TestResult.error);
    return res.status(200).json({ error: TestResult.error });
  } else {
    next();
  }
};

export const validateAudio: RequestHandler = (req, res, next) => {
  const AudioResult = AudioSchema.validate(req.body);
  if (AudioResult.error) {
    console.log(AudioResult.error);
    return res.status(200).json({ error: AudioResult.error });
  } else {
    next();
  }
};

export const validateUser: RequestHandler = (req, res, next) => {
  const userResult = userSchema.validate(req.body);
  if (userResult.error) {
    console.log(userResult.error);
    return res.status(200).json({ error: userResult.error });
  } else {
    next();
  }
};
