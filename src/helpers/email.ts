import Mail from 'nodemailer/lib/mailer';
import { google } from 'googleapis';
import MailComposer from 'nodemailer/lib/mail-composer';
import { generateActivationCode } from './random';
import otpModel from '../models/otp/otp.model';
import { log } from '../utils';

/**
 * @description Gmail tokens
 * @memberof EmailHelper
 * this object contains gmail tokens
 * these tokens are used to create gmail service
 * @see https://developers.google.com/gmail/api/quickstart/nodejs
 * token stored in .env file
 */
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

/**
 * @description Encode message to base64
 * @param {Buffer} message
 * @memberof EmailHelper
 * @returns string
 * this function is used to encode message to base64 and replace some characters
 */
const encodeMessage = (message: Buffer) => {
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * @description Create mail
 * this function is used to create mail with nodemailer and mailcomposer
 * mail options are passed as parameter
 * when mail is created, it is encoded to base64 and returned
 * @param options
 * @returns
 */
const createMail = async (options: Mail.Options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};

/**
 * @description Send otp email
 * @param {string} email
 * @param {string} name
 * @param {string} lastName
 * @param {string} type
 * @memberof EmailHelper
 * this function is used to send otp email to user
 * it takes email, name, lastName and type as parameter
 * type can be 'register' or 'login' and it is used to determine email subject
 * when email is sent, it is saved to database with otp code and email identifier
 * email identifier is used to delete email from gmail if user deletes otp email
 * @returns {Promise<{id: string, otpResult: any}>}
 * todo: this function should be refactored. it is too long and complex now
 */
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
      subject: 'Lotto OTP - Register',
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

    log('id', id);

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
      subject: 'Lotto OTP - Login',
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

    log('id', id);

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

const sendWelcomeEmail = async (
  email: string,
  name: string,
  lastName: string
) => {
  const options: Mail.Options = {
    to: email,
    replyTo: 'dnzyslrmk@gmail.com',
    subject: 'Lotto App - Welcome',
    html: `
    <h2>Hi ${name} ${lastName},</h2>
    <p>Thank you for registering to Loto App.</p>
    <p>Your account is now active.</p>
    <br />
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

  return id;
};

export { sendOtpEmail, sendWelcomeEmail };
