"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_validations_1 = require("../validations/url.validations");
const url_controllers_1 = require("../controllers/url.controllers");
const router = express_1.default.Router();
router.route('/shorten').post((0, url_validations_1.shortenUrlValidations)(), url_controllers_1.shortenUrl);
exports.default = router;
