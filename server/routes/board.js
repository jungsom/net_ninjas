import express from 'express';
import {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
} from '../controllers/boardController.js';

const boardRouter = express.Router();

// 전체 게시판 조회
boardRouter.get('/', getAllBoards);

// 특정 게시물 작성
boardRouter.post('/', createBoard);

// 특정 게시물 조회
boardRouter.get('/:boardId', getBoardById);

// 특정 게시물 수정
boardRouter.put('/:boardId', updateBoardById);

// 특정 게시물 삭제
boardRouter.delete('/:boardId', deleteBoardById);

export default boardRouter;
