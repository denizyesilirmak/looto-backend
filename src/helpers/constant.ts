export const registerEmailBody = (
  otp: string,
  name: string,
  lastName: string
) => `
<h2>Hi ${name} ${lastName},</h2>
<p>Thank you for registering to Loto App.</p>
<p>Your activation code is: <strong>${otp}</strong></p>
<p>Please enter this code to activate your account.</p>
<br />
<p>This code will expire in 15 minutes.</p>
<p>Best regards,</p>
<p>Loto App Team</p>
`;

export const loginEmailBody = (name: string, lastName: string, otp: string) => `
<h2>Hi ${name} ${lastName},</h2>
<p>Thank you for logging in to Loto App.</p>
<p>Your login code is: <strong>${otp}</strong></p>
<p>Please enter this code to login to your account.</p>
<br />
<p>This code will expire in 15 minutes.</p>
<p>Best regards,</p>
<p>Loto App Team</p>
`;

export const welcomeEmailBody = (name: string, lastName: string) => `
<h2>Hi ${name} ${lastName},</h2>
<p>Thank you for registering to Loto App.</p>
<p>Your account is now active.</p>
<br />
<p>Best regards,</p>
<p>Loto App Team</p>
`;
