import mongoose, { Schema } from 'mongoose';

const TicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ticketCode: {
    type: String,
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  hasDrawn: {
    type: Boolean,
    default: false,
  },
});

export interface ITicketSchema {
  user: string;
  createdAt: Date;
  ticketCode: string;
  game: string;
  hasDrawn: boolean;
}

export default mongoose.model<ITicketSchema>('Ticket', TicketSchema);
