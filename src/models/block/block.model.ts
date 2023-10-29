import mongoose, { Schema } from 'mongoose';

const BlockSchema = new Schema({
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  numbers: {
    type: [Number],
    required: true,
  },
  isWinner: {
    type: Boolean,
    default: false,
  },
});

export interface IBlockSchema {
  ticket: string;
  createdAt: Date;
  numbers: number[];
  isWinner: boolean;
}

export default mongoose.model<IBlockSchema>('Block', BlockSchema);
