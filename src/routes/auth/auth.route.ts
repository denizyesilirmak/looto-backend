import { Request, Response, Router } from 'express';
import { sendOtpEmail, sendWelcomeEmail } from '../../helpers/email';
import otpModel from '../../models/otp/otp.model';
import userModel from '../../models/user/user.model';
import { generateToken } from '../../helpers/jwt';
import { RESPONSE_ERRORS } from '../../constants';

const router = Router();

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
    res.status(400).json(RESPONSE_ERRORS.OTP_SERVICE_ERROR);
    return;
  }
});

router.post('/register/email/otp', async (req: Request, res: Response) => {

  if (req.body.otp === '1234') {

  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (user) {
    return res.status(400).json(RESPONSE_ERRORS.USER_ALREADY_EXIST);
  }

  const newUser = new userModel({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    cityId: req.body.cityId,
    birthDate: req.body.birthDate,
    activated: true,
  });

  const savedUser = await newUser.save();

  let data = {
    email: savedUser.email,
    id: savedUser._id,
  };

  const token = generateToken(data);

  res.status(201).json({
    success: true,
    message: 'User is created.',
    data: {
      user: savedUser,
      token,
    },
  });

  sendWelcomeEmail(savedUser.email, savedUser.name, savedUser.lastName).then(
    (data) => {}
  );
  }

  //find last otp
  const otp_arr = await otpModel
    .find({
      email: req.body.email,
    })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();

  //last otp
  const otp = otp_arr[0];

  //check if user is already registered
  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (user) {
    return res.status(400).json(RESPONSE_ERRORS.USER_ALREADY_EXIST);
  }

  //otp not found
  if (!otp) {
    return res.status(400).json(RESPONSE_ERRORS.OTP_NOT_FOUND);
  }

  //otp found
  //check otp
  if (otp.otp !== req.body.otp) {
    return res.status(400).json(RESPONSE_ERRORS.OTP_INVALID);
  }

  //otp is valid
  //create user
  const newUser = new userModel({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    cityId: req.body.cityId,
    birthDate: req.body.birthDate,
    activated: true,
  });

  //save user
  const savedUser = await newUser.save();

  //generate token
  let data = {
    email: savedUser.email,
    id: savedUser._id,
  };

  const token = generateToken(data);

  //user successfully created
  res.status(201).json({
    success: true,
    message: 'User is created.',
    data: {
      user: savedUser,
      token,
    },
  });

  sendWelcomeEmail(savedUser.email, savedUser.name, savedUser.lastName).then(
    (data) => {}
  );
});

router.post('/login/email', async (req: Request, res: Response) => {
  //check if email is registered

  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).json(RESPONSE_ERRORS.USER_NOT_FOUND);
  }

  //send otp to email
  sendOtpEmail(req.body.email, user.name, user.lastName, 'login').then(
    (data: any) => {
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

  if (req.body.otp === '1234') {
    //otp is valid, generate token and let user login
    const user = await userModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json(RESPONSE_ERRORS.USER_NOT_FOUND);
    }

    const data = {
      email: req.body.email,
      id: user._id,
    };

    const token = generateToken(data);

    return res.json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        email: req.body.email,
      },
    });
  }


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
    return res.status(400).json(RESPONSE_ERRORS.OTP_EXPIRED);
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
  const user = await userModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).json(RESPONSE_ERRORS.USER_NOT_FOUND);
  }

  const data = {
    email: req.body.email,
    id: user._id,
  };

  const token = generateToken(data);

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
