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
var profile_route_1 = require("./src/routes/profile/profile.route");
var general_route_1 = require("./src/routes/general/general.route");
var loger_1 = require("./src/middlewares/loger");
var vadidation_1 = require("./src/middlewares/vadidation");
var auth_1 = require("./src/middlewares/auth");
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var game_route_1 = require("./src/routes/game/game.route");
//connect to database
(0, database_1.default)();
var app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//custom middlewares
app.use(loger_1.loger);
app.use(vadidation_1.registerEmailValidation);
app.use(vadidation_1.registerEmailOtpValidation);
app.use(vadidation_1.loginEmailValidation);
app.use(auth_1.authorizationMiddleware);
//routes
app.use("/api/".concat(process.env.API_VERSION, "/"), general_route_1.generalRouter);
app.use("/api/".concat(process.env.API_VERSION, "/cities"), city_route_1.citiesRouter);
app.use("/api/".concat(process.env.API_VERSION, "/auth"), auth_route_1.authRouter);
app.use("/api/".concat(process.env.API_VERSION, "/profile"), profile_route_1.profileRouter);
app.use("/api/".concat(process.env.API_VERSION, "/games"), game_route_1.gameRouter);
if (process.env.NODE_ENV === 'production') {
    var server = https_1.default.createServer({
        key: fs_1.default.readFileSync('/root/deniz/ssl/key.pem'),
        cert: fs_1.default.readFileSync('/root/deniz/cert.pem'),
    }, app);
    server.listen(process.env.PORT, function () {
        console.log("\u2705 Server listening on port ".concat(process.env.PORT, "."));
    });
}
else {
    app.listen(process.env.PORT, function () {
        console.log("\u2705 Server listening on port ".concat(process.env.PORT, "."));
    });
}
