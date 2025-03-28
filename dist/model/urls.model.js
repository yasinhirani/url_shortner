"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UrlSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users" },
    urlCode: { type: String, unique: true },
    longUrl: String,
    createdAt: { type: Date, default: Date.now(), expires: '180d' },
});
exports.urlModel = mongoose_1.default.model("Urls", UrlSchema);
