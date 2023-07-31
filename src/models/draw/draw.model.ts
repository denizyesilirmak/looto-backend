import mongoose, { Schema } from 'mongoose';

const DrawSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  numbers: {
    type: [Number],
    required: true,
  },
  extraNumbers: {
    type: [Number],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface IDrawSchema extends mongoose.Document {
  game: string;
  numbers: number[];
  extraNumbers: number[];
  createdAt: Date;
}

export default mongoose.model('Draw', DrawSchema);
