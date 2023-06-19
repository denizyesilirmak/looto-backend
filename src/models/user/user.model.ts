import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "City",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

interface IUserSchema {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  activated: boolean;
  cityId: string;
  createdAt: Date;
}

export default mongoose.model<IUserSchema>("User", UserSchema);
