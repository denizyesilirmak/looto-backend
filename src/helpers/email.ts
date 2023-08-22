import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { generateActivationCode } from './random';
import {
  loginEmailBody,
  registerEmailBody,
  welcomeEmailBody,
} from './constant';

import otpModel from '../models/otp/otp.model';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dnzyslrmk@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendOtpEmail = async (
  email: string,
  name: string,
  lastName: string,
  type: string
) => {
  const otp = generateActivationCode();

  if (type === 'register') {
    const options: Mail.Options = {
      to: email,
      from: 'dnzyslrmk@gmail.com',
      replyTo: 'dnzyslrmk@gmail.com',
      subject: 'Lotto OTP - Register',
      html: registerEmailBody(otp, name, lastName),
    };

    try {
      transport.sendMail(options);
    } catch (error) {
      console.log(error);
    }
  } else if (type === 'login') {
    const options: Mail.Options = {
      to: email,
      from: 'dnzyslrmk@gmail.com',
      replyTo: 'dnzyslrmk@gmail.com',
      subject: 'Lotto OTP - Login',
      html: loginEmailBody(otp, name, lastName),
    };

    try {
      transport.sendMail(options);
    } catch (error) {
      console.log(error);
    }
  }

  const id = Math.random().toString(36);

  const otpResult = await otpModel.create({
    otp,
    email,
    emailIdentifier: id,
    type,
  });

  return {
    id,
    otpResult,
  };
};

const sendWelcomeEmail = async (
  email: string,
  name: string,
  lastName: string
) => {
  const options: Mail.Options = {
    to: email,
    from: 'dnzyslrmk@gmail.com',
    replyTo: 'dnzyslrmk@gmail.com',
    subject: 'Welcome to Loto App',
    html: welcomeEmailBody(name, lastName),
  };

  try {
    transport.sendMail(options);
  } catch (error) {
    console.log(error);
  }
};

export { sendOtpEmail, sendWelcomeEmail };
