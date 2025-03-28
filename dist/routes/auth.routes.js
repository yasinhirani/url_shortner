"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_validations_1 = require("../validations/auth.validations");
const router = express_1.default.Router();
router.route('/login').post((0, auth_validations_1.loginValidation)(), auth_controllers_1.login);
router.route('/register').post((0, auth_validations_1.registerValidation)(), auth_controllers_1.register);
exports.default = router;
