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
exports.redisClientConnect = exports.client = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = require("redis");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield mongoose_1.default.connect((_a = process.env.MONGODB_CONNECTION_URI) !== null && _a !== void 0 ? _a : "");
});
exports.connectDB = connectDB;
exports.client = (0, redis_1.createClient)({
    username: "default",
    password: '2fvx4cjEmt1mrRq47lhGcYKh7PLHR0BM',
    socket: {
        host: 'redis-15219.c84.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15219,
    },
});
const redisClientConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.client.connect().catch((error) => {
        throw new Error(error);
    });
});
exports.redisClientConnect = redisClientConnect;
