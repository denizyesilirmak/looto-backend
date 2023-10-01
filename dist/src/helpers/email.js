"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = exports.sendOtpEmail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var random_1 = require("./random");
var constant_1 = require("./constant");
var otp_model_1 = __importDefault(require("../models/otp/otp.model"));
var transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'dnzyslrmk@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
    },
});
var sendOtpEmail = function (email, name, lastName, type) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, options, options, id, otpResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                otp = (0, random_1.generateActivationCode)();
                if (type === 'register') {
                    options = {
                        to: email,
                        from: 'dnzyslrmk@gmail.com',
                        replyTo: 'dnzyslrmk@gmail.com',
                        subject: 'Lotto OTP - Register',
                        html: (0, constant_1.registerEmailBody)(otp, name, lastName),
                    };
                    try {
                        transport.sendMail(options);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                else if (type === 'login') {
                    options = {
                        to: email,
                        from: 'dnzyslrmk@gmail.com',
                        replyTo: 'dnzyslrmk@gmail.com',
                        subject: 'Lotto OTP - Login',
                        html: (0, constant_1.loginEmailBody)(otp, name, lastName),
                    };
                    try {
                        transport.sendMail(options);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                id = Math.random().toString(36);
                return [4 /*yield*/, otp_model_1.default.create({
                        otp: otp,
                        email: email,
                        emailIdentifier: id,
                        type: type,
                    })];
            case 1:
                otpResult = _a.sent();
                return [2 /*return*/, {
                        id: id,
                        otpResult: otpResult,
                    }];
        }
    });
}); };
exports.sendOtpEmail = sendOtpEmail;
var sendWelcomeEmail = function (email, name, lastName) { return __awaiter(void 0, void 0, void 0, function () {
    var options;
    return __generator(this, function (_a) {
        options = {
            to: email,
            from: 'dnzyslrmk@gmail.com',
            replyTo: 'dnzyslrmk@gmail.com',
            subject: 'Welcome to Loto App',
            html: (0, constant_1.welcomeEmailBody)(name, lastName),
        };
        try {
            transport.sendMail(options);
        }
        catch (error) {
            console.log(error);
        }
        return [2 /*return*/];
    });
}); };
exports.sendWelcomeEmail = sendWelcomeEmail;
