"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loger = function (req, res, next) {
    console.log("".concat(req.method, " ").concat(req.protocol, "://").concat(req.get("host")).concat(req.originalUrl));
    next();
};
