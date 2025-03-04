import express from 'express';
import authenticateUser from '../middlewares/authenticateMiddleware.js';
import {
  getAllBoards,
  createBoard,
  getBoardById,
  getBoardsByUserId,
  updateBoardById,
  deleteBoardById,
  searchBoardByHashtag
} from '../controllers/boardController.js';
import {
  createComment,
  getCommentsByBoardId,
  updateCommentById,
  deleteCommentById
} from '../controllers/commentController.js';
import { createLikeByBoardId } from '../controllers/likeController.js';
import { uploadBoardImage } from '../config/multer.js';
import { resizeBoardImage } from '../services/imageService.js';

const boardRouter = express.Router();

// 게시판 기능
boardRouter.get('/postByUser', authenticateUser, getBoardsByUserId);
boardRouter.get('/search', authenticateUser, searchBoardByHashtag);
boardRouter.get('/', authenticateUser, getAllBoards);
boardRouter.post(
  '/',
  authenticateUser,
  uploadBoardImage,
  resizeBoardImage,
  createBoard
);
boardRouter.get('/:boardId', authenticateUser, getBoardById);
boardRouter.put(
  '/:boardId',
  authenticateUser,
  uploadBoardImage,
  resizeBoardImage,
  updateBoardById
);
boardRouter.delete('/:boardId', authenticateUser, deleteBoardById);

// 댓글 기능
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

// 좋아요 기능
boardRouter.post('/:boardId/likes', authenticateUser, createLikeByBoardId);

export default boardRouter;
