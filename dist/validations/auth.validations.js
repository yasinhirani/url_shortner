"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../model/user.model"));
const loginValidation = () => {
    return [
        (0, express_validator_1.body)("email")
            .trim()
            .notEmpty()
            .withMessage("Email address is required")
            .isEmail({ ignore_max_length: true })
            .withMessage("Email address is invalid"),
        (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required"),
    ];
};
exports.loginValidation = loginValidation;
const registerValidation = () => {
    return [
        (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
        (0, express_validator_1.body)("email")
            .trim()
            .notEmpty()
            .withMessage("Email address is required")
            .isEmail({ ignore_max_length: true })
            .withMessage("Email address is invalid"),
        (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required"),
        (0, express_validator_1.body)("email").custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: value });
            if (user) {
                throw new Error("User with same email already exists");
            }
        })),
    ];
};
exports.registerValidation = registerValidation;
