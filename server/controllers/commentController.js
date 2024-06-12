import Comment from '../models/comment.js';
import { BadRequest } from '../middlewares/errorMiddleware.js';

export const createComment = async (req, res, next) => {
  try {
    const { boardId, userId, content } = req.body;

    if (!content || !content.length) {
      throw new BadRequest('내용을 입력해주세요.');
    }

    const comment = await Comment.create({
      boardId,
      userId,
      content
    });
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

export const getCommentsByBoardId = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const comments = await Comment.find({ boardId }).lean();
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export const updateCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || !content.length) {
      throw new BadRequest('내용을 입력해주세요.');
    }

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true, runValidators: true }
    );

    res.json({ message: '댓글 수정이 완료되었습니다.', comment });
  } catch (err) {
    next(err);
  }
};

export const deleteCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(commentId);
    res.json({ message: '댓글 삭제가 완료되었습니다.', comment });
  } catch (err) {
    next(err);
  }
};
