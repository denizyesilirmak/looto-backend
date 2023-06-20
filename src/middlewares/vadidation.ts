//validation middleware

import { Request, Response, NextFunction } from "express";

export const registerEmailValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //early return if path is not /register/email
  if (req.path !== "/register/email") {
    return next();
  }

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
  const emailRegex = /\S+@\S+\.\S+/;
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
  const phoneNumberRegex = /^\d{10}$/;
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

  next();
};
