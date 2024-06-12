import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, { versionKey : false });

commentSchema.set('timestamps', { createdAt: true, updatedAt: true });

const Comment = model('board', commentSchema);

export default Comment;