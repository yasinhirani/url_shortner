"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode).json({
        success: error.success,
        message: error.message,
        data: null,
    });
};
exports.errorHandler = errorHandler;
