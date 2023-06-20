"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var database_1 = __importDefault(require("./src/database"));
var city_route_1 = require("./src/routes/city/city.route");
var auth_route_1 = require("./src/routes/auth/auth.route");
var loger_1 = require("./src/middlewares/loger");
var vadidation_1 = require("./src/middlewares/vadidation");
//connect to database
(0, database_1.default)();
var app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//custom middlewares
app.use(loger_1.loger);
app.use(vadidation_1.registerEmailValidation);
//routes
app.use("/api/".concat(process.env.API_VERSION, "/cities"), city_route_1.citiesRouter);
app.use("/api/".concat(process.env.API_VERSION, "/auth"), auth_route_1.authRouter);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(process.env.PORT, function () {
    console.log("\u2705 Server listening on port ".concat(process.env.PORT, "."));
});
