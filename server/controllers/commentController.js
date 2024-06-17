import Comment from '../models/comment.js';
import { paginateData } from '../services/allResearchService.js';
import {
  BadRequest,
  NotFound,
  Forbidden
} from '../middlewares/errorMiddleware.js';

// 게시글에 대한 모든 댓글 조회
export const getCommentsByBoardId = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const commentLimit = req.query.limit || 20;
    const commentNext = req.query.next || null;
    const query = commentNext ? { _id: { $lt: commentNext } } : {};

    // 요청 변수 검증
    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .limit(commentLimit)
      .select('-userId')
      .lean();

    if (comments.length === 0) {
      throw new NotFound('댓글을 찾을 수 없습니다.');
    }

    const nextCursor = comments[comments.length - 1]._id;

    res.json({ data: comments, nextCursor });
  } catch (err) {
    next(err);
  }
};

// 댓글 작성
export const createComment = async (req, res, next) => {
  const { boardId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  // 요청 변수 검증
  if (!boardId || !content) {
    return next(new NotFound('요청 변수를 찾을 수 없습니다.'));
  }

  // 댓글 내용 검증
  if (!content.trim()) {
    return res.status(200).json({ message: '댓글 내용을 입력해주세요.' });
  } else if (content.length > 500) {
    return res
      .status(200)
      .json({ message: '댓글은 최대 100자까지 입력 가능합니다.' });
  }

  try {
    const comment = await Comment.create({
      userId,
      boardId,
      content
    });

    const data = {
      commentId: comment._id,
      boardId: boardId,
      content: comment.content,
      createdAt: comment.createdAt
    };

    res.status(200).json({ message: '댓글 작성이 완료되었습니다.', data });
  } catch (err) {
    next(err);
  }
};

// 댓글 수정
export const updateCommentById = async (req, res, next) => {
  try {
    const { boardId, commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // 요청 변수 검증
    if (!boardId || !content || !commentId) {
      throw new NotFound('요청 변수를 찾을 수 없습니다.');
    }

    // 댓글 검증
    if (content.trim().length === 0) {
      return res.status(200).json({ message: '댓글 내용을 입력해주세요.' });
    } else if (content.length > 500) {
      return res
        .status(200)
        .json({ message: '댓글은 최대 100자까지 입력 가능합니다.' });
    }

    // 댓글 조회
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new NotFound('댓글을 찾을 수 없습니다.');
    }

    // 권한 검증
    if (userId.toString() !== comment.userId.toString()) {
      throw new Forbidden('댓글을 수정할 수 있는 권한이 없습니다.');
    }

    // 댓글 업데이트
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        boardId,
        userId,
        content
      },
      { new: true, runValidators: true }
    );

    const data = {
      boardId: updatedComment._id,
      content: updatedComment.content,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt
    };

    res.status(200).json({ message: '댓글 수정이 완료되었습니다.', data });
  } catch (err) {
    next(err);
  }
};

export const deleteCommentById = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    // 요청 변수 검증
    if (!commentId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    // 댓글 조회
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new NotFound('댓글을 찾을 수 없습니다.');
    }

    // 권한 검증
    if (userId.toString() !== comment.userId.toString()) {
      throw new Forbidden('댓글을 삭제할 수 있는 권한이 없습니다.');
    }

    // 댓글 삭제
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: '댓글 삭제가 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
};

// 댓글 개수 조회
export const getCommentCount = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const commentsCount = await Comment.countDocuments({ boardId });

    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    res.status(200).json(commentsCount);
  } catch (err) {
    next(err);
  }
};
