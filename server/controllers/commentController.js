import Comment from '../models/comment.js';
import { BadRequest } from '../middlewares/errorMiddleware.js';

export const createComment = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.create(
        {
        boardId: boardId,
        userId: userId,
        content: content
        }
    );
    res.json(comment);

  } catch (err) {
    next(err);
  }
};

export const getCommentsByBoardId = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const comment = await Comment.findById(boardId).lean();

    res.json(comment);

  } catch (err) {
    next(err);
  }
};

export const updateCommentById = async (req, res, next) => {
  try {
    const { boardId, commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByIdAndUpdate(
        {
        boardId: boardId,
        commentId: commentId,
        userId: userId,
        content: content
        },
        { new: true, runValidators: true }
    );

    res.json({ message: "댓글 수정이 완료되었습니다.", comment });
  } catch (err) {
    next(err);
  }
};

export const deleteCommentById = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const comment = await Comment.findByIdAndDelete(boardId)

    res.json({ message: "댓글 삭제가 완료되었습니다.", comment });
  } catch (err) {
    next(err);
  }
};
