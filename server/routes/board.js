import express from 'express';
import authenticateUser from '../middlewares/authenticateMiddleware.js';
import {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
} from '../controllers/boardController.js';
import {
  createComment,
  getCommentsByBoardId,
  updateCommentById,
  deleteCommentById
} from '../controllers/commentController.js';
import uploadImage from '../config/multerConfig.js';

const boardRouter = express.Router();

// 전체 게시판 조회
boardRouter.get('/', getAllBoards);

boardRouter.post('/', authenticateUser, upload.array('image', 5), createBoard);
boardRouter.get(
  '/:boardId',
  authenticateUser,
  upload.array('image', 5),
  getBoardById
);
boardRouter.put(
  '/:boardId',
  authenticateUser,
  upload.array('image', 5),
  updateBoardById
);
boardRouter.delete('/:boardId', authenticateUser, deleteBoardById);

// 댓글 조회
boardRouter.get('/:boardId/comments', authenticateUser, getCommentsByBoardId);
boardRouter.post('/:boardId/comments', authenticateUser, createComment);
boardRouter.put(
  '/:boardId/comments/:commentId',
  authenticateUser,
  updateCommentById
);
boardRouter.delete(
  '/:boardId/comments/:commentId',
  authenticateUser,
  deleteCommentById
);

export default boardRouter;
