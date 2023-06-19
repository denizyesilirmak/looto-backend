import mongoose, { Schema } from "mongoose";

const LogSchema = new Schema({
  url: {
    type: String,
    required: false,
  },
  method: {
    type: String,
    required: false,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  userAgent: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

interface ILogSchema {
  url: string;
  method: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export default mongoose.model<ILogSchema>("Log", LogSchema);
