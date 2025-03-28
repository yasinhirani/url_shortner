"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBase58Code = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bs58_1 = __importDefault(require("bs58"));
const generateBase58Code = () => {
    const randomBytes = crypto_1.default.randomBytes(3);
    return bs58_1.default.encode(randomBytes);
};
exports.generateBase58Code = generateBase58Code;
