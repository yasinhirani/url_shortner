"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(data, message = "") {
        this.success = true;
        this.message = message;
        this.data = data;
    }
}
exports.default = ApiResponse;
