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
var fs_1 = __importDefault(require("fs"));
var https_1 = __importDefault(require("https"));
var utils_1 = require("./src/utils");
var express_rate_limit_1 = require("express-rate-limit");
(0, utils_1.log)('NODE_ENV', process.env.NODE_ENV, 'green');
//connect to database
(0, database_1.default)();
var app = (0, express_1.default)();
exports.app = app;
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    max: 20,
    message: 'Too many requests from this IP',
}));
//custom middlewares
app.use(loger_1.loger);
app.use(vadidation_1.registerEmailValidation);
app.use(vadidation_1.registerEmailOtpValidation);
app.use(vadidation_1.loginEmailValidation);
app.use(auth_1.authorizationMiddleware);
//routes
routes_1.routes.initRoutes();
//static files
app.use('/images', express_1.default.static("".concat(__dirname, "/src/static/images")));
if (process.env.NODE_ENV === 'production') {
    var privateKey = fs_1.default.readFileSync('/root/securiry/ssl/privkey.pem', 'utf8');
    var certificate = fs_1.default.readFileSync('/root/securiry/ssl/cert.pem', 'utf8');
    var ca = fs_1.default.readFileSync('/root/securiry/ssl/chain.pem', 'utf8');
    var server = https_1.default.createServer({
        key: privateKey,
        cert: certificate,
        ca: ca,
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
