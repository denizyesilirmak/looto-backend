"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var resend_1 = require("resend");
var email_1 = require("../../helpers/email");
var router = (0, express_1.Router)();
exports.authRouter = router;
var resend = new resend_1.Resend(process.env.RESEND_API_KEY);
router.post("/register/email", function (req, res) {
    //name validation
    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            message: "Name is required.",
        });
    }
    //lastName validation
    if (!req.body.lastname) {
        return res.status(400).json({
            success: false,
            message: "Last name is required.",
        });
    }
    //email validation
    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            message: "Email is required.",
        });
    }
    //email format validation
    var emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
            success: false,
            message: "Email format is invalid.",
        });
    }
    //phoneNumber validation
    if (!req.body.phoneNumber) {
        return res.status(400).json({
            success: false,
            message: "Phone number is required.",
        });
    }
    //phoneNumber format validation
    var phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(req.body.phoneNumber)) {
        return res.status(400).json({
            success: false,
            message: "Phone number format is invalid.",
        });
    }
    //cityId validation
    if (!req.body.cityId) {
        return res.status(400).json({
            success: false,
            message: "City is required.",
        });
    }
    //birthDate validation
    if (!req.body.birthDate) {
        return res.status(400).json({
            success: false,
            message: "Birth date is required.",
        });
    }
    (0, email_1.sendActivationEmail)(req.body.email, req.body.name, req.body.lastname).then(function (data) {
        console.log(data);
    });
    res.json({
        success: true,
        data: req.body,
    });
});
