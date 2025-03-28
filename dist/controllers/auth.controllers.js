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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const apiResponse_1 = __importDefault(require("../utilities/apiResponse"));
const user_model_1 = __importDefault(require("../model/user.model"));
const apiError_1 = __importDefault(require("../utilities/apiError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const login = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new apiError_1.default(result.array({ onlyFirstError: true })[0].msg, 400);
    }
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email }).select('-__v');
    if (!user) {
        return next(new apiError_1.default("User not found", 404));
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        return next(new apiError_1.default("Email Id or Password is incorrect", 400));
    }
    const _a = user.toObject(), { password: _ } = _a, updatedUser = __rest(_a, ["password"]);
    res.status(200).json(new apiResponse_1.default(updatedUser));
}));
exports.login = login;
const register = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new apiError_1.default(result.array({ onlyFirstError: true })[0].msg, 400);
    }
    const { name, email, password } = req.body;
    const user = new user_model_1.default({ email, name, password }).save();
    if (user) {
        res.sendStatus(201);
    }
}));
exports.register = register;
