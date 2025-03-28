import { body } from "express-validator";

const shortenUrlValidations = () => {
  return [
    body("url")
      .trim()
      .notEmpty()
      .withMessage("URL is required")
      .isURL()
      .withMessage("Please enter a valid URL"),
  ];
};

export { shortenUrlValidations };
