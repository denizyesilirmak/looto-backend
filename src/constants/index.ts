export const OTP_DURATION = 3 * 60;

export const RESPONSE_ERRORS = {
  EMAIL_REQUIRED: {
    success: false,
    message: 'Email is required.',
    code: 2009,
  },
  EMAIL_FORMAT_INVALID: {
    success: false,
    message: 'Email format is invalid.',
    code: 2010,
  },
  NAME_REQUIRED: {
    success: false,
    message: 'Name is required.',
    code: 2011,
  },
  LAST_NAME_REQUIRED: {
    success: false,
    message: 'Last name is required.',
    code: 2012,
  },
  PHONE_NUMBER_REQUIRED: {
    success: false,
    message: 'Phone number is required.',
    code: 2013,
  },
  PHONE_NUMBER_FORMAT_INVALID: {
    success: false,
    message: 'Phone number format is invalid.',
    code: 2014,
  },
  OTP_REQUIRED: {
    success: false,
    message: 'Otp is required.',
    code: 2015,
  },
  OTP_INVALID: {
    success: false,
    message: 'Otp is invalid.',
    code: 2016,
  },
  OTP_EXPIRED: {
    success: false,
    message: 'Otp is expired.',
    code: 2017,
  },
  OTP_NOT_FOUND: {
    success: false,
    message: 'Otp not found.',
    code: 2018,
  },
  OTP_NOT_MATCH: {
    success: false,
    message: 'Otp not match.',
    code: 2019,
  },
  OTP_SERVICE_ERROR: {
    success: false,
    message: 'Otp service error. Please try again later.',
    code: 2099,
  },
  PASSWORD_REQUIRED: {
    success: false,
    message: 'Password is required.',
    code: 2020,
  },
  PASSWORD_FORMAT_INVALID: {
    success: false,
    message: 'Password format is invalid.',
    code: 2021,
  },
  PASSWORD_NOT_MATCH: {
    success: false,
    message: 'Password not match.',
    code: 2022,
  },
  USER_NOT_FOUND: {
    success: false,
    message: 'User not found.',
    code: 2023,
  },
  USER_ALREADY_EXIST: {
    success: false,
    message: 'User already exist.',
    code: 2024,
  },
  USER_NOT_VERIFIED: {
    success: false,
    message: 'User not verified.',
    code: 2025,
  },
  USER_NOT_ACTIVE: {
    success: false,
    message: 'User not active.',
    code: 2026,
  },
};
