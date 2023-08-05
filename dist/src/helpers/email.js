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
var googleapis_1 = require("googleapis");
var mail_composer_1 = __importDefault(require("nodemailer/lib/mail-composer"));
var random_1 = require("./random");
var otp_model_1 = __importDefault(require("../models/otp/otp.model"));
var utils_1 = require("../utils");
/**
 * @description Gmail tokens
 * @memberof EmailHelper
 * this object contains gmail tokens
 * these tokens are used to create gmail service
 * @see https://developers.google.com/gmail/api/quickstart/nodejs
 * token stored in .env file
 */
var tokens = {
    access_token: process.env.GMAIL_ACCESS_TOKEN,
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    scope: process.env.GMAIL_SCOPE_TOKEN,
    token_type: process.env.GMAIL_TYPE_TOKEN,
    expiry_date: parseInt(process.env.GMAIL_EXPIRE_TOKEN || Date.now().toString()),
};
var getGmailService = function () {
    var oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, process.env.GMAIL_REDIRECT_URI);
    oAuth2Client.setCredentials(tokens);
    var gmail = googleapis_1.google.gmail({ version: 'v1', auth: oAuth2Client });
    return gmail;
};
/**
 * @description Encode message to base64
 * @param {Buffer} message
 * @memberof EmailHelper
 * @returns string
 * this function is used to encode message to base64 and replace some characters
 */
var encodeMessage = function (message) {
    return Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};
/**
 * @description Create mail
 * this function is used to create mail with nodemailer and mailcomposer
 * mail options are passed as parameter
 * when mail is created, it is encoded to base64 and returned
 * @param options
 * @returns
 */
var createMail = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var mailComposer, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailComposer = new mail_composer_1.default(options);
                return [4 /*yield*/, mailComposer.compile().build()];
            case 1:
                message = _a.sent();
                return [2 /*return*/, encodeMessage(message)];
        }
    });
}); };
/**
 * @description Send otp email
 * @param {string} email
 * @param {string} name
 * @param {string} lastName
 * @param {string} type
 * @memberof EmailHelper
 * this function is used to send otp email to user
 * it takes email, name, lastName and type as parameter
 * type can be 'register' or 'login' and it is used to determine email subject
 * when email is sent, it is saved to database with otp code and email identifier
 * email identifier is used to delete email from gmail if user deletes otp email
 * @returns {Promise<{id: string, otpResult: any}>}
 * todo: this function should be refactored. it is too long and complex now
 */
var sendOtpEmail = function (email, name, lastName, type) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, options, gmail, rawMessage, _a, _b, id, otpResult, options, gmail, rawMessage, _c, _d, id, otpResult;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                otp = (0, random_1.generateActivationCode)();
                if (!(type === 'register')) return [3 /*break*/, 4];
                options = {
                    to: email,
                    replyTo: 'dnzyslrmk@gmail.com',
                    subject: 'Lotto OTP - Register',
                    html: "\n      <h2>Hi ".concat(name, " ").concat(lastName, ",</h2>\n      <p>Thank you for registering to Loto App.</p>\n      <p>Your activation code is: <strong>").concat(otp, "</strong></p>\n      <p>Please enter this code to activate your account.</p>\n      <br />\n      <p>This code will expire in 15 minutes.</p>\n      <p>Best regards,</p>\n      <p>Loto App Team</p>\n  "),
                    textEncoding: 'base64',
                };
                gmail = getGmailService();
                return [4 /*yield*/, createMail(options)];
            case 1:
                rawMessage = _e.sent();
                return [4 /*yield*/, gmail.users.messages.send({
                        userId: 'me',
                        resource: {
                            raw: rawMessage,
                        },
                    })];
            case 2:
                _a = (_e.sent()).data, _b = _a === void 0 ? {} : _a, id = _b.id;
                (0, utils_1.log)('id', id);
                return [4 /*yield*/, otp_model_1.default.create({
                        otp: otp,
                        email: email,
                        emailIdentifier: id,
                        type: type,
                    })];
            case 3:
                otpResult = _e.sent();
                return [2 /*return*/, {
                        id: id,
                        otpResult: otpResult,
                    }];
            case 4:
                if (!(type === 'login')) return [3 /*break*/, 8];
                options = {
                    to: email,
                    replyTo: 'dnzyslrmk@gmail.com',
                    subject: 'Lotto OTP - Login',
                    html: "\n      <h2>Hi ".concat(name, " ").concat(lastName, ",</h2>\n      <p>Thank you for registering to Loto App.</p>\n      <p>Your activation code is: <strong>").concat(otp, "</strong></p>\n      <p>Please enter this code to activate your account.</p>\n      <br />\n      <p>This code will expire in 15 minutes.</p>\n      <p>Best regards,</p>\n      <p>Loto App Team</p>\n  "),
                    textEncoding: 'base64',
                };
                gmail = getGmailService();
                return [4 /*yield*/, createMail(options)];
            case 5:
                rawMessage = _e.sent();
                return [4 /*yield*/, gmail.users.messages.send({
                        userId: 'me',
                        resource: {
                            raw: rawMessage,
                        },
                    })];
            case 6:
                _c = (_e.sent()).data, _d = _c === void 0 ? {} : _c, id = _d.id;
                (0, utils_1.log)('id', id);
                otp_model_1.default.create({
                    otp: otp,
                    email: email,
                    emailIdentifier: id,
                    type: type,
                });
                return [4 /*yield*/, otp_model_1.default.create({
                        otp: otp,
                        email: email,
                        emailIdentifier: id,
                        type: type,
                    })];
            case 7:
                otpResult = _e.sent();
                return [2 /*return*/, {
                        id: id,
                        otpResult: otpResult,
                    }];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.sendOtpEmail = sendOtpEmail;
var sendWelcomeEmail = function (email, name, lastName) { return __awaiter(void 0, void 0, void 0, function () {
    var options, gmail, rawMessage, _a, _b, id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                options = {
                    to: email,
                    replyTo: 'dnzyslrmk@gmail.com',
                    subject: 'Lotto App - Welcome',
                    html: "\n    <h2>Hi ".concat(name, " ").concat(lastName, ",</h2>\n    <p>Thank you for registering to Loto App.</p>\n    <p>Your account is now active.</p>\n    <br />\n    <p>Best regards,</p>\n    <p>Loto App Team</p>\n"),
                    textEncoding: 'base64',
                };
                gmail = getGmailService();
                return [4 /*yield*/, createMail(options)];
            case 1:
                rawMessage = _c.sent();
                return [4 /*yield*/, gmail.users.messages.send({
                        userId: 'me',
                        resource: {
                            raw: rawMessage,
                        },
                    })];
            case 2:
                _a = (_c.sent()).data, _b = _a === void 0 ? {} : _a, id = _b.id;
                return [2 /*return*/, id];
        }
    });
}); };
exports.sendWelcomeEmail = sendWelcomeEmail;
