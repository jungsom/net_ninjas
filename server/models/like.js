import { Schema, model } from 'mongoose';

const likeSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
);

const Like = model('Like', likeSchema);

export default Like;
