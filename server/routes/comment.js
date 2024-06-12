import express from 'express';
import {
  createComment,
  getCommentsByBoardId,
  updateCommentById,
  deleteCommentById
} from '../controllers/commentController.js';
import authenticateUser from '../middlewares/authenticateMiddleware.js';

const commentRouter = express.Router();

// 특정 게시물의 전체 댓글 조회
commentRouter.get('/:boardId/comments', getCommentsByBoardId);

// 특정 댓글 작성
commentRouter.post('/:boardId/comments', authenticateUser, createComment);

// 특정 댓글 수정
commentRouter.put('/:commentId', authenticateUser, updateCommentById);

// 특정 댓글 삭제
commentRouter.delete('/:commentId', authenticateUser, deleteCommentById);

export default commentRouter;
