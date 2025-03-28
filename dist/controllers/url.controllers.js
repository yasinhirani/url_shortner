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
exports.redirectToUrl = exports.shortenUrl = void 0;
const asyncHandler_1 = require("../utilities/asyncHandler");
const express_validator_1 = require("express-validator");
const apiError_1 = __importDefault(require("../utilities/apiError"));
const generateBase58Code_1 = require("../utilities/generateBase58Code");
const urls_model_1 = require("../model/urls.model");
const apiResponse_1 = __importDefault(require("../utilities/apiResponse"));
const db_1 = require("../db/db");
const shortenUrl = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new apiError_1.default(result.array({ onlyFirstError: true })[0].msg, 400);
    }
    const { userId, url } = req.body;
    let existingUrl;
    if (userId) {
        existingUrl = yield urls_model_1.urlModel.findOne({ userId, longUrl: url });
    }
    else {
        existingUrl = yield urls_model_1.urlWithoutUserIdModel.findOne({ longUrl: url });
    }
    if (existingUrl) {
        res.status(200).json(new apiResponse_1.default({
            shortUrl: `${process.env.HOST_URL}${existingUrl.urlCode}`,
        }));
        return;
    }
    while (true) {
        try {
            const urlCode = (0, generateBase58Code_1.generateBase58Code)();
            let codeRes;
            if (!userId) {
                codeRes = yield new urls_model_1.urlWithoutUserIdModel({
                    longUrl: url,
                    urlCode,
                }).save();
            }
            else {
                codeRes = yield new urls_model_1.urlModel({
                    userId,
                    longUrl: url,
                    urlCode,
                }).save();
            }
            if (codeRes) {
                res.status(200).json(new apiResponse_1.default({
                    shortUrl: `${process.env.HOST_URL}${codeRes.urlCode}`,
                }));
                return;
            }
        }
        catch (error) {
            if (error.code !== 11000)
                throw new apiError_1.default(error.message, 400);
        }
    }
}));
exports.shortenUrl = shortenUrl;
const redirectToUrl = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new apiError_1.default(result.array({ onlyFirstError: true })[0].msg, 400);
    }
    const { shortCode } = req.params;
    const cachedUrl = yield db_1.client.get(shortCode);
    if (cachedUrl) {
        res.redirect(cachedUrl);
        return;
    }
    let urlRes;
    urlRes = yield urls_model_1.urlModel.findOne({ urlCode: shortCode });
    if (!urlRes) {
        urlRes = yield urls_model_1.urlWithoutUserIdModel.findOne({ urlCode: shortCode });
        if (!urlRes) {
            throw new apiError_1.default("Invalid URL", 400);
        }
    }
    yield db_1.client.setEx(shortCode, 3600, urlRes.longUrl);
    res.redirect((_a = urlRes.longUrl) !== null && _a !== void 0 ? _a : "");
}));
exports.redirectToUrl = redirectToUrl;
