"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenUrlValidations = void 0;
const express_validator_1 = require("express-validator");
const shortenUrlValidations = () => {
    return [
        (0, express_validator_1.body)("url")
            .trim()
            .notEmpty()
            .withMessage("URL is required")
            .isURL()
            .withMessage("Please enter a valid URL"),
    ];
};
exports.shortenUrlValidations = shortenUrlValidations;
