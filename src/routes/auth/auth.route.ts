import { Request, Response, Router } from "express";
import { Resend } from "resend";
import { sendActivationEmail } from "../../helpers/email";
import otpModel from "../../models/otp/otp.model";
import userModel from "../../models/user/user.model";

const router = Router();

router.post("/register/email", (req: Request, res: Response) => {
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

  //birthDate validation
  if (!req.body.birthDate) {
    return res.status(400).json({
      success: false,
      message: "Birth date is required.",
    });
  }

  sendActivationEmail(req.body.email, req.body.name, req.body.lastname).then(
    (data) => {
      console.log(data);
      res.json({
        success: true,
        data: req.body,
        message: "Activation email sent. User can now verify his email.",
      });
    }
  );
});

router.post("/register/email/otp", async (req: Request, res: Response) => {
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

  //otp validation
  if (!req.body.otp) {
    return res.status(400).json({
      success: false,
      message: "OTP is required.",
    });
  }

  //find otp in database
  const otp = await otpModel.find({ email: req.body.email });
  console.log("anan", anan);

  //FIXME - check if otp is expired or not
  // get the last otp from otp array
  // if otp is expired, return error
  // if otp is not expired, check if otp is correct
  // if otp is correct, create user

  //create user
  const user = new userModel({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    cityId: req.body.cityId,
    birthDate: req.body.birthDate,
  });

  user.save((err: any, user: any) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }

    res.json({
      success: true,
      data: user,
      message: "User created.",
    });
  });
});

export { router as authRouter };
