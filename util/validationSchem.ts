import Joi from "joi";

export const SchoolSchema = Joi.object({
  schoolName: Joi.string().required(),
  email: Joi.string().email().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  pin: Joi.string().length(6).required(),
  address: Joi.string().required(),
});

export const TestSchema = Joi.object({
  Title: Joi.string().required(),
  category: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
});

export const AudioSchema = Joi.object({
  Title: Joi.string().required(),
  Url: Joi.string().required(),
  TestId: Joi.number().required(),
});
