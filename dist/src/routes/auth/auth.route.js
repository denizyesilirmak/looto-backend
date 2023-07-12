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
exports.authRouter = void 0;
var express_1 = require("express");
var email_1 = require("../../helpers/email");
var otp_model_1 = __importDefault(require("../../models/otp/otp.model"));
var user_model_1 = __importDefault(require("../../models/user/user.model"));
var jwt_1 = require("../../helpers/jwt");
var router = (0, express_1.Router)();
exports.authRouter = router;
router.post('/register/email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, email_1.sendOtpEmail)(req.body.email, req.body.name, req.body.lastName, 'register')];
            case 1:
                data = _a.sent();
                res.status(200).json({
                    success: true,
                    message: 'Otp is sent.',
                    data: {
                        email: data === null || data === void 0 ? void 0 : data.otpResult.email,
                        emailIdentifier: data === null || data === void 0 ? void 0 : data.otpResult.emailIdentifier,
                        expiresAt: data === null || data === void 0 ? void 0 : data.otpResult.expiresAt,
                        createdAt: data === null || data === void 0 ? void 0 : data.otpResult.createdAt,
                        type: data === null || data === void 0 ? void 0 : data.otpResult.type,
                    },
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log('error', error_1);
                res.status(400).json({
                    success: false,
                    message: 'Otp is not sent.',
                });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/register/email/otp', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp_arr, otp, user, newUser, savedUser, data, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, otp_model_1.default
                    .find({
                    email: req.body.email,
                })
                    .sort({ createdAt: -1 })
                    .limit(1)
                    .exec()];
            case 1:
                otp_arr = _a.sent();
                otp = otp_arr[0];
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: req.body.email,
                    })];
            case 2:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'User is already registered.',
                            email: req.body.email,
                        })];
                }
                //otp not found
                if (!otp) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Otp time expired. Try again.',
                        })];
                }
                //otp found
                //check otp
                if (otp.otp !== req.body.otp) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Otp is invalid.',
                        })];
                }
                newUser = new user_model_1.default({
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    cityId: req.body.cityId,
                    birthDate: req.body.birthDate,
                    activated: true,
                });
                return [4 /*yield*/, newUser.save()];
            case 3:
                savedUser = _a.sent();
                //generate token
                console.log('savedUser', savedUser);
                data = {
                    email: savedUser.email,
                    id: savedUser._id,
                };
                token = (0, jwt_1.generateToken)(data);
                res.json({
                    success: true,
                    message: 'User is created.',
                    data: {
                        user: savedUser,
                        token: token,
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
router.post('/login/email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.findOne({
                    email: req.body.email,
                })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'User is not registered.',
                            email: req.body.email,
                        })];
                }
                //send otp to email
                (0, email_1.sendOtpEmail)(req.body.email, user.name, user.lastName, 'login').then(function (data) {
                    console.log('email sent', data);
                    res.json({
                        success: true,
                        message: 'OTP is sent to email.',
                        data: {
                            email: req.body.email,
                        },
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
router.post('/login/email/otp', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp_arr, otp, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, otp_model_1.default
                    .find({
                    email: req.body.email,
                    type: 'login',
                })
                    .sort({ createdAt: -1 })
                    .limit(1)
                    .exec()];
            case 1:
                otp_arr = _a.sent();
                otp = otp_arr[0];
                //otp not found
                if (!otp) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Otp time expired. Try again.',
                        })];
                }
                //otp found
                //check otp
                if (otp.otp !== req.body.otp) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Otp is invalid.',
                        })];
                }
                token = (0, jwt_1.generateToken)(req.body.email);
                res.json({
                    success: true,
                    message: 'Login successful.',
                    data: {
                        token: token,
                        email: req.body.email,
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
