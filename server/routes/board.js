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
  deleteCommentById,
  getCommentCount
} from '../controllers/commentController.js';
import {
  createLikeByBoardId,
  getLikesByBoardId
} from '../controllers/likeController.js';
import uploadImage from '../config/multer.js';

const boardRouter = express.Router();

// 게시판 기능
boardRouter.get('/', getAllBoards);
boardRouter.post(
  '/',
  authenticateUser,
  uploadImage.array('image', 5),
  createBoard
);
boardRouter.get(
  '/:boardId',
  authenticateUser,
  uploadImage.array('image', 5),
  getBoardById
);
boardRouter.put(
  '/:boardId',
  authenticateUser,
  uploadImage.array('image', 5),
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
boardRouter.get('/:boardId/comments/count', authenticateUser, getCommentCount);

// 좋아요 기능
boardRouter.get('/:boardId/likes', authenticateUser, getLikesByBoardId);
boardRouter.post('/:boardId/likes', authenticateUser, createLikeByBoardId);

export default boardRouter;
