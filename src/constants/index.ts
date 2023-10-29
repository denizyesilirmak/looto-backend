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
  UNAUTHORIZED: {
    success: false,
    message: 'Unauthorized.',
    code: 2027,
  },
  EMAIL_OR_PHONE_ALREADY_EXIST: {
    success: false,
    message: 'Email or phone number already exist.',
    code: 2028,
  },
  CITY_ID_REQUIRED: {
    success: false,
    message: 'City is required.',
    code: 2029,
  },
  INTERNAL_SERVER_ERROR: {
    success: false,
    message: 'Internal server error.',
    code: 2099,
  },
  AMOUNT_REQUIRED: {
    success: false,
    message: 'Amount is required on request body.',
    code: 2030,
  },
  AMOUNT_MUST_BE_NUMBER: {
    success: false,
    message: 'Amount must be a number.',
    code: 2031,
  },
  AMOUNT_MUST_BE_POSITIVE: {
    success: false,
    message: 'Amount must be positive.',
    code: 2032,
  },
  EMAIL_NOT_ALLOWED: {
    success: false,
    message: 'Email update not allowed.',
    code: 2033,
  },
  BALANCE_NOT_ALLOWED: {
    success: false,
    message: 'Balance update not allowed.',
    code: 2034,
  },
  GAME_NOT_FOUND: {
    success: false,
    message: 'Game not found.',
    code: 2035,
  },
  SERVER_ERROR: {
    success: false,
    message: 'General server error. Report to admin.',
    code: 2099,
  },
  BLOCK_NUMBERS_COUNT_NOT_MATCH: {
    success: false,
    message: 'Numbers on block must be equal to required numbers.',
    code: 2036,
  },
  INVALID_NUMBERS: {
    success: false,
    message:
      'Invalid numbers. Numbers must be between minimum and maximum numbers of game.',
    code: 2037,
  },
  INSUFFICIENT_BALANCE: {
    success: false,
    message: 'Insufficient balance.',
    code: 2038,
  },
};
