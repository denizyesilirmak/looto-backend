import { Request, Response, Router } from "express";
import { Resend } from "resend";
import { sendActivationEmail } from "../../helpers/email";

const router = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

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
    }
  );

  res.json({
    success: true,
    data: req.body,
  });
});

export { router as authRouter };
