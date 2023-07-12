import Mail from 'nodemailer/lib/mailer';
import { google } from 'googleapis';
import MailComposer from 'nodemailer/lib/mail-composer';
import { generateActivationCode } from './random';
import otpModel from '../models/otp/otp.model';

const tokens = {
  access_token: process.env.GMAIL_ACCESS_TOKEN,
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  scope: process.env.GMAIL_SCOPE_TOKEN,
  token_type: process.env.GMAIL_TYPE_TOKEN,
  expiry_date: parseInt(
    process.env.GMAIL_EXPIRE_TOKEN || Date.now().toString()
  ),
};

const getGmailService = () => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  return gmail;
};

const encodeMessage = (message: Buffer) => {
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const createMail = async (options: Mail.Options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};

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
      replyTo: 'dnzyslrmk@gmail.com',
      subject: 'Loto OTP - Register',
      html: `
      <h2>Hi ${name} ${lastName},</h2>
      <p>Thank you for registering to Loto App.</p>
      <p>Your activation code is: <strong>${otp}</strong></p>
      <p>Please enter this code to activate your account.</p>
      <br />
      <p>This code will expire in 15 minutes.</p>
      <p>Best regards,</p>
      <p>Loto App Team</p>
  `,
      textEncoding: 'base64',
    };

    const gmail = getGmailService();
    const rawMessage = await createMail(options);
    const { data: { id } = {} } = await gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: rawMessage,
      },
    } as any);

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
  } else if (type === 'login') {
    const options: Mail.Options = {
      to: email,
      replyTo: 'dnzyslrmk@gmail.com',
      subject: 'Loto OTP - Login',
      html: `
      <h2>Hi ${name} ${lastName},</h2>
      <p>Thank you for registering to Loto App.</p>
      <p>Your activation code is: <strong>${otp}</strong></p>
      <p>Please enter this code to activate your account.</p>
      <br />
      <p>This code will expire in 15 minutes.</p>
      <p>Best regards,</p>
      <p>Loto App Team</p>
  `,
      textEncoding: 'base64',
    };

    const gmail = getGmailService();
    const rawMessage = await createMail(options);
    const { data: { id } = {} } = await gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: rawMessage,
      },
    } as any);

    otpModel.create({
      otp,
      email,
      emailIdentifier: id,
      type,
    });

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
  }
};

// sendMail({
//   to: 'muhsin.ertugan@gmail.com, dnzyslrmk@gmail.com',
//   replyTo: 'dnzyslrmk@gmail.com',
//   subject: 'Loto OTP',
//   html: '<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> from <a href="https://digitalinspiration.com">Digital Inspiration</a>.</p>',
//   textEncoding: 'base64',
// }).then(console.log);

export { sendOtpEmail };
