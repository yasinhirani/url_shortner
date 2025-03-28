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
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db/db");
(0, dotenv_1.config)({ path: "./.env" });
(0, db_1.connectDB)()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.redisClientConnect)().then(() => {
        app_1.default.listen(8080, () => console.log("Server listening on port 8080"));
    });
}))
    .catch((error) => console.log(error.message));
