import e from "express";
import { Resend } from "resend";
import otpModel from "../models/otp/otp.model";

const resend = new Resend(process.env.RESEND_API_KEY);

//four digit random number generator
const generateActivationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendActivationEmail = async (
  email: string,
  name: string,
  lastname: string
) => {
  return new Promise((resolve, reject) => {
    const otp = generateActivationCode();

    resend.emails
      .send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Loto App - Activation Code",
        html: `
            <h2>Hi ${name} ${lastname},</h2>
            <p>Thank you for registering to Loto App.</p>
            <p>Your activation code is: <strong>${otp}</strong></p>
            <p>Please enter this code to activate your account.</p>
            <br />
            <p>This code will expire in 15 minutes.</p>
            <p>Best regards,</p>
            <p>Loto App Team</p>
        `,
      })
      .then((data) => {
        otpModel.create({
          otp,
          email,
          emailIdentifier: data.id,
        });

        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { sendActivationEmail };
