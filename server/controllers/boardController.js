import Board from '../models/board.js';
import Like from '../models/like.js';
import Comment from '../models/comment.js';
import {
  BadRequest,
  NotFound,
  Forbidden
} from '../middlewares/errorMiddleware.js';
import {
  getBoardWithCounts,
  getBoardWithDetails
} from '../services/boardService.js';
import { boardSchema } from '../validations/boardValidation.js';

/** 전체 게시판 글 조회 */
export const getAllBoards = async (req, res, next) => {
  try {
    const limit = req.query.limit || 20;
    const next = req.query.next || null;
    const userId = req.user.id;

    //요청 변수 검증
    if (limit <= 0) {
      throw new BadRequest('최소 1개 이상의 게시글을 요청해주세요.');
    }

    // 쿼리 조건 정의
    const query = next ? { _id: { $lt: next } } : {};

    // 게시글 조회 (페이지네이션)
    const boards = await Board.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .populate({
        path: 'userId',
        select: '-_id -__v -password'
      })
      .lean();

    // 게시글 여부 검증
    if (!boards) {
      throw new NotFound('게시글이 존재하지 않습니다.');
    }

    const nextCursor = boards[boards.length - 1]._id;

    // 댓글 수, 좋아요 수, 로그인한 유저 여부 매핑
    const boardsWithCounts = await getBoardWithCounts(boards, userId);

    res.status(200).json({ data: boardsWithCounts, nextCursor });
  } catch (err) {
    next(err);
  }
};

/** 특정 게시글 조회 */
export const getBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const userId = req.user.id;

    // 요청 변수 검증
    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    // 게시글 조회 (페이지네이션)
    const board = await Board.findById(boardId)
      .populate({
        path: 'userId',
        select: '-_id -__v -password'
      })
      .lean();

    // 게시글 여부 검증
    if (!board) {
      throw new NotFound('게시글이 존재하지 않습니다.');
    }

    // 댓글 정보, 좋아요 정보, 로그인한 유저 여부 매핑
    const boardWithDetails = await getBoardWithDetails(board, userId);

    res.status(200).json({ data: boardWithDetails });
  } catch (err) {
    next(err);
  }
};

/** 특정 해시태그에 대한 게시글 조회 */
export const searchBoardByHashtag = async (req, res, next) => {
  try {
    const hashtag = req.query.hashtag;
    const searchLimit = req.query.limit || 20;
    const searchNext = req.query.next || null;
    const userId = req.user.id;

    //요청 변수 검증
    if (!hashtag) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    } else if (searchLimit <= 0) {
      throw new BadRequest('최소 1개 이상의 게시글을 요청해주세요.');
    }

    // 쿼리 조건 정의
    const query = searchNext
      ? {
          hashtag: { $elemMatch: { $regex: hashtag, $options: 'i' } },
          _id: { $lt: searchNext }
        }
      : { hashtag: { $elemMatch: { $regex: hashtag, $options: 'i' } } };

    // 게시글 조회 (페이지네이션)
    const hashtagBoards = await Board.find(query)
      .sort({ createdAt: -1 })
      .limit(searchLimit)
      .populate({
        path: 'userId',
        select: '-_id -__v -password'
      })
      .lean();

    // 게시글 여부 검증
    if (!hashtagBoards) {
      throw new NotFound('해당 해시태그에 대한 게시글이 없습니다.');
    }

    // 댓글 수, 좋아요 수, 로그인한 유저 여부 매핑
    const hashtagBoardsWithCounts = await getBoardWithCounts(
      hashtagBoards,
      userId
    );

    const nextCursor = hashtagBoards[hashtagBoards.length - 1]._id;

    res.status(200).json({ data: hashtagBoardsWithCounts, nextCursor });
  } catch (err) {
    next(err);
  }
};

/** 사용자 모든 게시글 조회 컨트롤러 */
export const getBoardsByUserId = async (req, res, next) => {
  try {
    const userLimit = req.query.limit || 20;
    const userNext = req.query.next || null;
    const userId = req.user.id;

    // 요청 변수 검증
    if (userLimit <= 0) {
      throw new BadRequest('최소 1개 이상의 게시글을 요청해주세요.');
    }

    // 쿼리 조건 정의
    const query = userNext ? { userId, _id: { $lt: userNext } } : { userId };

    // 게시글 조회 (페이지네이션)
    const userBoards = await Board.find(query)
      .sort({ createdAt: -1 })
      .limit(userLimit)
      .populate({
        path: 'userId',
        select: '-_id -__v -password'
      })
      .lean();

    // 게시글 여부 검증
    if (!userBoards) {
      throw new NotFound('게시글이 존재하지 않습니다.');
    }

    // 댓글 정보, 좋아요 정보, 로그인한 유저 여부 매핑
    const userBoardsWithCounts = await getBoardWithCounts(userBoards, userId);

    const nextCursor = userBoards[userBoards.length - 1]._id;

    res.status(200).json({ data: userBoardsWithCounts, nextCursor });
  } catch (err) {
    next(err);
  }
};

/** 게시글 작성 */
export const createBoard = async (req, res, next) => {
  const { title, content, hashtag } = req.body;
  const userId = req.user.id;
  const image =
    req.files.length > 0
      ? req.files.map((file) => file.path)
      : ['boardImages/defaultImage.png'];
  const hashtagSet = hashtag >= 2 ? Array.from(new Set(hashtag)) : hashtag;

  // 유효성 검증
  const { error } = boardSchema.validate({ title, content });

  if (error) {
    return res.status(400).json({ code: 400, message: error.message });
  }

  try {
    const board = await Board.create({
      userId,
      title,
      content,
      hashtag: hashtagSet,
      image
    });

    const data = {
      boardId: board._id,
      content: board.content,
      hashtag: board.hashtag,
      image: board.image,
      createdAt: board.createdAt
    };

    res.status(200).json({ message: '게시글 작성이 완료되었습니다.', data });
  } catch (err) {
    next(err);
  }
};

/** 게시글 수정 */
export const updateBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, content, hashtag } = req.body;
    const userId = req.user.id;
    const hashtagSet = new Set(hashtag);
    const image = req.files.map((file) => file.path);

    // 요청 변수 검증
    if (!boardId) {
      throw new NotFound('요청 변수를 찾을 수 없습니다.');
    }

    // 유효성 검증
    const { error } = boardSchema.validate({ title, content });

    if (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }

    // 게시글 조회
    const board = await Board.findById(boardId);

    if (!board) {
      throw new NotFound('게시글이 존재하지 않습니다.');
    }

    // 권한 검증
    if (userId.toString() !== board.userId.toString()) {
      throw new Forbidden('게시글을 수정할 수 있는 권한이 없습니다.');
    }

    // 게시글 업데이트
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      {
        userId,
        title,
        content,
        hashtag: hashtagSet,
        image
      },
      { new: true, runValidators: true }
    );

    const data = {
      title: updatedBoard.title,
      content: updatedBoard.content,
      hashtag: updatedBoard.hashtag,
      image: updatedBoard.image,
      createdAt: updatedBoard.createdAt,
      updatedAt: updatedBoard.updatedAt
    };

    res.status(200).json({ message: '게시글 수정이 완료되었습니다.', data });
  } catch (err) {
    next(err);
  }
};

// 게시글 삭제 컨트롤러
export const deleteBoardById = async (req, res, next) => {
  const { boardId } = req.params;
  const userId = req.user.id;

  try {
    // 요청 변수 검증
    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    // 게시물 조회
    const board = await Board.findById(boardId);

    if (!board) {
      throw new NotFound('게시글이 존재하지 않습니다.');
    }

    // 권한 검증
    if (userId.toString() !== board.userId.toString()) {
      throw new Forbidden('게시글을 삭제할 수 있는 권한이 없습니다.');
    }

    // 게시물 삭제
    await Board.findByIdAndDelete(boardId);
    // 댓글 삭제
    await Comment.deleteMany({ boardId });
    // 좋아요 삭제
    await Like.deleteMany({ boardId });

    res.status(200).json({ message: '게시글 삭제가 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
};
