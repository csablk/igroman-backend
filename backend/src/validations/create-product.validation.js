import { body } from "express-validator";

export const createProductValidation = [
  body("title").isString().isLength({ min: 1, max: 50 }),
  body("text").isLength({ min: 6 }),
  body("category").isString(),
];
