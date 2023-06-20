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
  type: {
    type: String,
    enum: ["register", "login"],
    required: true,
  },
  expiredAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
});

export interface IOtpSchema {
  otp: string;
  email: string;
  phoneNumber: string;
  emailIdentifier: string;
  createdAt: Date;
  expiredAt: Date;
  type: "register" | "login";
}

export default mongoose.model<IOtpSchema>("Otp", OtpSchema);
