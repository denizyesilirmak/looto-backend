//validation middleware

import { NextFunction, Request, Response } from 'express';
import { RESPONSE_ERRORS } from '../constants';
import userModel from '../models/user/user.model';

export const registerEmailValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //early return if path is not /register/email
  if (req.path !== `/api/${process.env.API_VERSION}/auth/register/email`) {
    return next();
  }
  console.log('registerEmailValidation');

  //check if email or phoneNumber is already registered

  const user = await userModel.findOne({
    $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
  });

  // console.log("user", user);

  if (user) {
    return res.status(400).json(RESPONSE_ERRORS.EMAIL_OR_PHONE_ALREADY_EXIST);
  }

  //name validation
  if (!req.body.name) {
    return res.status(400).json(RESPONSE_ERRORS.NAME_REQUIRED);
  }

  //lastName validation
  if (!req.body.lastName) {
    return res.status(400).json(RESPONSE_ERRORS.LAST_NAME_REQUIRED);
  }

  //email validation
  if (!req.body.email) {
    return res.status(400).json(RESPONSE_ERRORS.EMAIL_REQUIRED);
  }

  //email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json(RESPONSE_ERRORS.EMAIL_FORMAT_INVALID);
  }

  //phoneNumber validation
  if (!req.body.phoneNumber) {
    return res.status(400).json(RESPONSE_ERRORS.PHONE_NUMBER_REQUIRED);
  }

  //phoneNumber format validation
  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(req.body.phoneNumber)) {
    return res.status(400).json(RESPONSE_ERRORS.PHONE_NUMBER_FORMAT_INVALID);
  }

  //cityId validation
  if (!req.body.cityId) {
    return res.status(400).json(RESPONSE_ERRORS.CITY_ID_REQUIRED);
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
    return res.status(400).json(RESPONSE_ERRORS.EMAIL_REQUIRED);
  }

  //email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json(RESPONSE_ERRORS.EMAIL_FORMAT_INVALID);
  }

  //name validation
  if (!req.body.name) {
    return res.status(400).json(RESPONSE_ERRORS.NAME_REQUIRED);
  }

  //lastName validation
  if (!req.body.lastName) {
    return res.status(400).json(RESPONSE_ERRORS.LAST_NAME_REQUIRED);
  }

  //phoneNumber validation
  if (!req.body.phoneNumber) {
    return res.status(400).json(RESPONSE_ERRORS.PHONE_NUMBER_REQUIRED);
  }

  //phoneNumber format validation
  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(req.body.phoneNumber)) {
    return res.status(400).json(RESPONSE_ERRORS.PHONE_NUMBER_FORMAT_INVALID);
  }

  //otp validation
  if (!req.body.otp) {
    return res.status(400).json(RESPONSE_ERRORS.OTP_REQUIRED);
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
    return res.status(400).json(RESPONSE_ERRORS.EMAIL_REQUIRED);
  }

  //email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json(RESPONSE_ERRORS.EMAIL_FORMAT_INVALID);
  }

  //check if email is registered

  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).json(RESPONSE_ERRORS.USER_NOT_FOUND);
  }

  next();
};
