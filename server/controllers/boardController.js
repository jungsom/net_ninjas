import Board from '../models/board.js';
import { paginateData } from '../services/allResearchService.js';
import { BadRequest } from '../middlewares/errorMiddleware.js';

export const getAllBoards = async (req, res, next) => {
  try {
    const perPage = parseInt(req.query.perPage) || 20;
    const pageNo = parseInt(req.query.pageNo) || 1;

    const data = await Board.find().lean();

    const paginatedData = paginateData(data, perPage, pageNo);

    res.json(paginatedData);
  } catch (err) {
    next(err);
  }
};

export const createBoard = async (req, res, next) => {
  try {
    const { userId, title, content, hashtag } = req.body;

    if (!title || !title.length) {
      throw new BadRequest('제목을 입력해주세요.');
    } else if (!content || !content.length) {
      throw new BadRequest('내용을 입력해주세요.');
    } else if (title.length > 20) {
      throw new BadRequest('제목은 최대 20자까지 입력 가능합니다.');
    }

    const board = await Board.create({
      userId,
      title,
      content,
      hashtag
    });
    res.json(board);
  } catch (err) {
    next(err);
  }
};

export const getBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId).lean();
    res.json(board);
  } catch (err) {
    next(err);
  }
};

export const updateBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, content, hashtag } = req.body;

    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        title,
        content,
        hashtag
      },
      { new: true, runValidators: true }
    );

    res.json({ message: '게시물 수정이 완료되었습니다.', board });
  } catch (err) {
    next(err);
  }
};

export const deleteBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findByIdAndDelete(boardId);
    res.json({ message: '게시물 삭제가 완료되었습니다.', board });
  } catch (err) {
    next(err);
  }
};
