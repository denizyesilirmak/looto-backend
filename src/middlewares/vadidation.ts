//validation middleware

import { Request, Response, NextFunction } from "express";
import userModel, { IUserSchema } from "../models/user/user.model";
import { MongooseError } from "mongoose";

export const registerEmailValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //early return if path is not /register/email
  if (req.path !== `/api/${process.env.API_VERSION}/auth/register/email`) {
    return next();
  }
  console.log("registerEmailValidation");

  //check if email or phoneNumber is already registered

  const user = await userModel.findOne({
    $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
  });

  // console.log("user", user);

  if (user) {
    return res.status(400).json({
      success: false,
      code: 2001,
      message: "Email or phone number is already registered.",
      data: {
        email: req.body.email,
      },
    });
  }

  //name validation
  if (!req.body.name) {
    return res.status(400).json({
      code: 2002,
      success: false,
      message: "Name is required.",
    });
  }

  //lastName validation
  if (!req.body.lastName) {
    return res.status(400).json({
      code: 2003,
      success: false,
      message: "Last name is required.",
    });
  }

  //email validation
  if (!req.body.email) {
    return res.status(400).json({
      code: 2004,
      success: false,
      message: "Email is required.",
    });
  }

  //email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      code: 2005,
      success: false,
      message: "Email format is invalid.",
    });
  }

  //phoneNumber validation
  if (!req.body.phoneNumber) {
    return res.status(400).json({
      code: 2006,
      success: false,
      message: "Phone number is required.",
    });
  }

  //phoneNumber format validation
  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(req.body.phoneNumber)) {
    return res.status(400).json({
      code: 2007,
      success: false,
      message: "Phone number format is invalid.",
    });
  }

  //cityId validation
  if (!req.body.cityId) {
    return res.status(400).json({
      code: 2008,
      success: false,
      message: "City is required.",
    });
  }

  next();
};

export const registerEmailOtpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //early return if path is not /register/email
  if (req.path !== `/api/${process.env.API_VERSION}/auth/register/email/otp`) {
    return next();
  }

  //email validation
  if (!req.body.email) {
    return res.status(400).json({
      code: 2009,
      success: false,
      message: "Email is required.",
    });
  }

  //email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      success: false,
      message: "Email format is invalid.",
    });
  }

  //name validation
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Name is required.",
    });
  }

  //lastName validation
  if (!req.body.lastName) {
    return res.status(400).json({
      success: false,
      message: "Last name is required.",
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
  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(req.body.phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Phone number format is invalid.",
    });
  }

  //otp validation
  if (!req.body.otp) {
    return res.status(400).json({
      success: false,
      message: "Otp is required.",
    });
  }

  next();
};

export const loginEmailValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //early return if path is not /login/email

  if (req.path !== `/api/${process.env.API_VERSION}/auth/login/email`) {
    return next();
  }

  //email validation
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: "Email is required.",
    });
  }

  //email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      success: false,
      message: "Email format is invalid.",
    });
  }

  //check if email is registered

  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Email is not registered.",
    });
  }

  next();
};
