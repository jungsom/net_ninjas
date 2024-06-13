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

const boardRouter = express.Router();

// 전체 게시판 조회
boardRouter.get('/', authenticateUser, getAllBoards);

boardRouter.post('/', authenticateUser, createBoard);
boardRouter.get('/:boardId', authenticateUser, getBoardById);
boardRouter.put('/:boardId', authenticateUser, updateBoardById);
boardRouter.delete('/:boardId', authenticateUser, deleteBoardById);

// 댓글 조회
boardRouter.get('/:boardId/comments', getCommentsByBoardId);
boardRouter.post('/:boardId/comments', authenticateUser,  createComment);
boardRouter.put('/:commentId', authenticateUser,  updateCommentById);
boardRouter.delete('/:commentId', authenticateUser, deleteCommentById);


export default boardRouter;
