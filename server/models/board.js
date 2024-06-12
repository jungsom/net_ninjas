import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    hashtag: {
      type: [String]
    }
  },
  { versionKey: false }
);

boardSchema.set('timestamps', { createdAt: true, updatedAt: true });

const Board = model('Board', boardSchema);

export default Board;
