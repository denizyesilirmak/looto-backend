import { Request, Response, Router } from 'express';
import { sendOtpEmail } from '../../helpers/email';
import otpModel from '../../models/otp/otp.model';
import userModel from '../../models/user/user.model';
import { generateToken } from '../../helpers/jwt';

const router = Router();

interface otpResponseType extends Response {
  success: boolean;
  message: string;
  data?: {
    email: string;
    emailIdentifier: string;
    expiresAt: Date;
    createdAt: Date;
    type: string;
  };
}

router.post('/register/email', async (req: Request, res: Response) => {
  //send otp to email

  try {
    const data = await sendOtpEmail(
      req.body.email,
      req.body.name,
      req.body.lastName,
      'register'
    );

    res.status(200).json({
      success: true,
      message: 'Otp is sent.',
      data: {
        email: data?.otpResult.email,
        emailIdentifier: data?.otpResult.emailIdentifier,
        expiresAt: data?.otpResult.expiresAt,
        createdAt: data?.otpResult.createdAt,
        type: data?.otpResult.type,
      },
    });
  } catch (error) {
    console.log('error', error);
    res.status(400).json({
      success: false,
      message: 'Otp is not sent.',
    });
    return;
  }
});

router.post('/register/email/otp', async (req: Request, res: Response) => {
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
      message: 'Otp time expired. Try again.',
    });
  }

  //otp found
  //check otp
  if (otp.otp !== req.body.otp) {
    return res.status(400).json({
      success: false,
      message: 'Otp is invalid.',
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
    message: 'User is created.',
    data: {
      user: savedUser,
    },
  });
});

router.post('/login/email', async (req: Request, res: Response) => {
  //check if email is registered

  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return;
  }

  //send otp to email
  sendOtpEmail(req.body.email, user.name, user.lastName, 'login').then(
    (data) => {
      console.log('email sent', data);
      res.json({
        success: true,
        message: 'OTP is sent to email.',
        data: {
          email: req.body.email,
        },
      });
    }
  );
});

router.post('/login/email/otp', async (req: Request, res: Response) => {
  //find last otp
  const otp_arr = await otpModel
    .find({
      email: req.body.email,
      type: 'login',
    })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();

  const otp = otp_arr[0];

  //otp not found

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: 'Otp time expired. Try again.',
    });
  }

  //otp found
  //check otp
  if (otp.otp !== req.body.otp) {
    return res.status(400).json({
      success: false,
      message: 'Otp is invalid.',
    });
  }

  //otp is valid, generate token and let user login
  const token = generateToken(req.body.email);

  res.json({
    success: true,
    message: 'Login successful.',
    data: {
      token,
      email: req.body.email,
    },
  });
});

export { router as authRouter };
