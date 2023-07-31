import mongoose, { Schema, Types } from 'mongoose';

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  columnPrice: {
    type: Number,
    required: true,
    default: 10,
  },
  prize: {
    type: Number,
    required: true,
    default: 100000,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  mininumNumber: {
    type: Number,
    required: true,
    default: 1,
  },
  maximumNumber: {
    type: Number,
    required: true,
    default: 49,
  },
  requriedNumbers: {
    type: Number,
    required: true,
    default: 6,
  },
  extraNumbers: {
    type: Number,
    required: true,
    default: 1,
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'TRY'],
    default: 'TRY',
  },
  cronExpression: {
    type: String,
    required: true,
  },
  cronExpressionDescription: {
    type: String,
    required: true,
  },
  gameCode: {
    type: String,
    required: true,
    unique: true,
  },
  gameType: {
    type: String,
    required: false,
    default: 'lottery',
  },
});

export interface IGameSchema {
  name: string;
  description: string;
  price: number;
  prize: number;
  image: string;
  createdAt: Date;
  status: string;
  mininumNumber: number;
  maximumNumber: number;
  requriedNumbers: number;
  extraNumbers: number;
  currency: string;
  cronExpression: string;
  cronExpressionDescription: string;
  gameCode: string;
  gameType: string;
  _id: Types.ObjectId;
}

export default mongoose.model<IGameSchema>('Game', GameSchema);
