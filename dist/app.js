"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const url_routes_1 = __importDefault(require("./routes/url.routes"));
const errorHandler_1 = require("./utilities/errorHandler");
const url_controllers_1 = require("./controllers/url.controllers");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiError_1 = __importDefault(require("./utilities/apiError"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 24 * 60 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    handler: (req, res, next) => {
        next(new apiError_1.default("You have reached the daily app request limit for today.", 429));
    },
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/users", auth_routes_1.default);
app.use("/api/url", limiter, url_routes_1.default);
app.get("/:shortCode", url_controllers_1.redirectToUrl);
app.use("*", (req, res, next) => next(new apiError_1.default(`Could not ${req.method} ${req.baseUrl}`, 404)));
app.use(errorHandler_1.errorHandler);
exports.default = app;
