import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      'deposit',
      'withdraw',
      'transfer',
      'payment',
      'refund',
      'fee',
      'income',
      'expense',
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface ITransactionSchema {
  userId: string;
  amount: number;
  type: string;
  createdAt: Date;
}

export default mongoose.model<ITransactionSchema>(
  'Transaction',
  TransactionSchema
);
