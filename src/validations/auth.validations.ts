import { body } from "express-validator";
import userModel from "../model/user.model";

const loginValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email address is required")
      .isEmail({ ignore_max_length: true })
      .withMessage("Email address is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const registerValidation = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email address is required")
      .isEmail({ ignore_max_length: true })
      .withMessage("Email address is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("email").custom(async (value) => {
      const user = await userModel.findOne({ email: value });
      if (user) {
        throw new Error("User with same email already exists");
      }
    }),
  ];
};

export { loginValidation, registerValidation };
