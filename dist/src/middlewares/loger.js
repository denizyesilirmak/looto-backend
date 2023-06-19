"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loger = void 0;
var log_model_1 = __importDefault(require("../models/log/log.model"));
var loger = function (req, res, next) {
    console.log("".concat(req.method, " ").concat(req.protocol, "://").concat(req.get("host")).concat(req.originalUrl));
    log_model_1.default.create({
        url: "".concat(req.protocol, "://").concat(req.get("host")).concat(req.originalUrl),
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
    });
    next();
};
exports.loger = loger;