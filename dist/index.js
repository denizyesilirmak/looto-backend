"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("./src/database"));
(0, database_1.default)();
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(process.env.PORT, function () {
    console.log("\u2705 Server listening on port ".concat(process.env.PORT, "."));
});
