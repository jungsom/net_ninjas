import express from 'express';
import authenticateUser from '../middlewares/authenticateMiddleware.js';
import {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
} from '../controllers/boardController.js';

const boardRouter = express.Router();

// 전체 게시판 조회
boardRouter.get('/', authenticateUser, getAllBoards);

// 특정 게시물 작성
boardRouter.post('/', authenticateUser, createBoard);

// 특정 게시물 조회
boardRouter.get('/:boardId', authenticateUser, getBoardById);

// 특정 게시물 수정
boardRouter.put('/:boardId', authenticateUser, updateBoardById);

// 특정 게시물 삭제
boardRouter.delete('/:boardId', authenticateUser, deleteBoardById);

export default boardRouter;
