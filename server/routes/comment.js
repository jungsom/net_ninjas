import express from 'express';
import {
  createComment,
  getCommentsByBoardId,
  updateCommentById,
  deleteCommentById
} from '../controllers/commentController.js';

const commentRouter = express.Router();

// 특정 게시물의 전체 댓글 조회
commentRouter.get('/:boardId/comments', getCommentsByBoardId);

// 특정 댓글 작성
commentRouter.post('/', createComment);

// 특정 댓글 수정
commentRouter.put('/:commentId', updateCommentById);

// 특정 댓글 삭제
commentRouter.delete('/:commentId', deleteCommentById);

export default commentRouter;
