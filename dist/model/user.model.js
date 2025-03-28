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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const password = yield bcrypt_1.default.hash((_a = this.password) !== null && _a !== void 0 ? _a : '', 10);
        this.password = password;
        next();
    });
});
exports.default = mongoose_1.default.model('Users', UserSchema);
