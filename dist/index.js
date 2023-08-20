"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("./src/database"));
var routes_1 = require("./src/routes");
var auth_1 = require("./src/middlewares/auth");
var loger_1 = require("./src/middlewares/loger");
var vadidation_1 = require("./src/middlewares/vadidation");
var utils_1 = require("./src/utils");
var express_rate_limit_1 = require("express-rate-limit");
var scheduler_1 = require("./src/scheduler");
var rate_limit_1 = require("./src/config/rate-limit");
/**
 * @description Environment variables
 * NODE_ENV: development | production
 * this logs whether the app is running in development or production mode
 */
(0, utils_1.log)('NODE_ENV', process.env.NODE_ENV, 'green');
/**
 * @description Start the database connection
 */
(0, database_1.default)();
var app = (0, express_1.default)();
exports.app = app;
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_rate_limit_1.rateLimit)(rate_limit_1.rateLimitConfig));
//custom middlewares
app.use(loger_1.loger);
app.use(vadidation_1.registerEmailValidation);
app.use(vadidation_1.registerEmailOtpValidation);
app.use(vadidation_1.loginEmailValidation);
app.use(auth_1.authorizationMiddleware);
/**
 * @description Routes
 * @memberof App
 * This is where we define our routes
 */
routes_1.routes.initRoutes();
//draw scheduler
scheduler_1.drawScheduler.start();
//static files
app.use('/images', express_1.default.static("".concat(__dirname, "/src/static/images")));
/**
 * @description Start the server
 * @memberof App
 * if the app is running in production mode, we need to use https
 * otherwise, we can use http
 * @see https://nodejs.org/api/https.html
 * load the ssl certificates and create a https server instance
 * ssl certificates are stored in shared docker volume
 */
app.listen(process.env.PORT, function () {
    console.log("\u2705 Server listening on port ".concat(process.env.PORT, "."));
});
