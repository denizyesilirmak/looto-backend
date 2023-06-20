import mongoose, { Schema } from "mongoose";

const OtpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  emailIdentifier: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
});

interface IOtpSchema {
  otp: string;
  email: string;
  phoneNumber: string;
  emailIdentifier: string;
  createdAt: Date;
  expiredAt: Date;
}

export default mongoose.model<IOtpSchema>("Otp", OtpSchema);
