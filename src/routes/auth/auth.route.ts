import { Request, Response, Router } from "express";
import { Resend } from "resend";
import { sendOtpEmail } from "../../helpers/email";
import otpModel from "../../models/otp/otp.model";
import userModel from "../../models/user/user.model";

const router = Router();

//register
//user'ı kaydet - pasif olarak
//otp yolla
//otp doğrulanırsa user'ı aktif et

router.post("/register/email", (req: Request, res: Response) => {
  //send otp to email
  sendOtpEmail(
    req.body.email,
    req.body.name,
    req.body.lastName,
    "register"
  ).then((data) => {
    console.log("email sent", data);
    res.json({
      success: true,
      message: "OTP is sent to email.",
      data: {
        email: req.body.email,
      },
    });
  });
});

router.post("/register/email/otp", async (req: Request, res: Response) => {
  //find last otp
  const otp_arr = await otpModel
    .find({
      email: req.body.email,
    })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();

  const otp = otp_arr[0];

  //otp not found
  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "Otp time expired. Try again.",
    });
  }

  console.log("otp", otp);

  //otp found
  //check otp
  if (otp.otp !== req.body.otp) {
    return res.status(400).json({
      success: false,
      message: "Otp is invalid.",
    });
  }

  //otp is valid
  //create user
  const user = new userModel({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    cityId: req.body.cityId,
    birthDate: req.body.birthDate,
    activated: true,
  });

  //save user
  const savedUser = await user.save();

  res.json({
    success: true,
    message: "User is created.",
    data: {
      user: savedUser,
    },
  });
});

router.post("/login/email", async (req: Request, res: Response) => {
  //check if email is registered

  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return;
  }

  //send otp to email
  sendOtpEmail(req.body.email, user.name, user.lastName, "login").then(
    (data) => {
      console.log("email sent", data);
      res.json({
        success: true,
        message: "OTP is sent to email.",
        data: {
          email: req.body.email,
        },
      });
    }
  );
});

router.post("/login/email/otp", async (req: Request, res: Response) => {
  //find last otp
  const otp_arr = await otpModel
    .find({
      email: req.body.email,
      type: "login",
    })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();

  const otp = otp_arr[0];

  //otp not found

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "Otp time expired. Try again.",
    });
  }

  //otp found
  //check otp
  if (otp.otp !== req.body.otp) {
    return res.status(400).json({
      success: false,
      message: "Otp is invalid.",
    });
  }

  //otp is valid
  res.json({
    success: true,
    message: "Otp is valid. Login success.",
    data: {
      email: req.body.email,
    },
  });
});

export { router as authRouter };
