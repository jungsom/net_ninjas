import Board from '../models/board.js';
import { paginateData } from '../services/allResearchService.js';
import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';

/** 전체 게시판 조회 컨트롤러 */
export const getAllBoards = async (req, res, next) => {
  try {
    const perPage = parseInt(req.query.perPage) || 20;
    const pageNo = parseInt(req.query.pageNo) || 1;

    // 게시글 조회
    const data = await Board.find().lean();

    // 페이지네이션
    const paginatedData = paginateData(data, perPage, pageNo);

    if (paginatedData.paginatedData.length === 0) {
      throw new NotFound('게시글을 찾을 수 없습니다.');
    }

    res.json(paginatedData);
  } catch (err) {
    next(err);
  }
};

/** 게시글 작성 컨트롤러 */
export const createBoard = async (req, res, next) => {
  const { title, content, hashtag } = req.body;
  const userId = req.user.id;
  const image = req.files.map((file) => file.path);

  // 요청 변수 검증
  if (!userId || !title || !content) {
    throw new BadRequest('요청 변수를 찾을 수 없습니다.');
  }

  // 제목과 내용 검증
  if (!title.trim() || !content.trim()) {
    return res.status(200).json({ message: '제목 혹은 내용을 입력해주세요.' });
  } else if (title.length > 30) {
    return res
      .status(200)
      .json({ message: '제목은 최대 30자까지 입력 가능합니다.' });
  } else if (content.length > 1000) {
    return res
      .status(200)
      .json({ message: '내용은 최대 1000자까지 입력 가능합니다.' });
  }

  // 해시태그 중복 검증
  if (hashtag && new Set(hashtag).size !== hashtag.length) {
    return res
      .status(200)
      .json({ message: '중복된 태그를 사용할 수 없습니다.' });
  }

  try {
    const board = await Board.create({
      userId,
      title,
      content,
      hashtag,
      image
    });

    const response = {
      boardId: board._id,
      content: board.content,
      hashtag: board.hashtag,
      createdAt: board.createdAt,
      image: board.image
    };

    res
      .status(200)
      .json({ message: '게시글 작성이 완료되었습니다.', response });
  } catch (err) {
    next(err);
  }
};

/** 게시글 조회 컨트롤러 */
export const getBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    // 요청 변수 검증
    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    const board = await Board.findById(boardId).lean();

    if (!board) {
      throw new NotFound('게시글을 찾을 수 없습니다.');
    }

    const response = {
      title: board.title,
      content: board.content,
      hashtag: board.hashtag,
      image: board.image,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt
    };

    res.status(200).json({ message: '게시글이 조회되었습니다.', response });
  } catch (err) {
    next(err);
  }
};

/** 게시글 수정 컨트롤러 */
export const updateBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, content, hashtag } = req.body;
    const userId = req.user.id;
    const set = new Set(hashtag);
    const image = req.files.map((file) => file.path);

    // 요청 변수 검증
    if (!boardId || !title || !content) {
      throw new NotFound('요청 변수를 찾을 수 없습니다.');
    }

    // 제목과 내용 검증
    if (title.trim().length === 0 || content.trim().length === 0) {
      return res
        .status(200)
        .json({ message: '제목 혹은 내용을 입력해주세요.' });
    } else if (title.length > 30) {
      return res
        .status(200)
        .json({ message: '제목은 최대 30자까지 입력 가능합니다.' });
    }

    // 해시태그 중복 검증
    if (hashtag && hashtag.length !== set.size) {
      return res
        .status(200)
        .json({ message: '중복된 태그를 사용할 수 없습니다.' });
    }

    // 게시글 조회
    const board = await Board.findById(boardId);

    if (!board) {
      throw new NotFound('게시글을 찾을 수 없습니다.');
    }

    // 권한 검증
    if (userId.toString() !== board.userId.toString()) {
      return res
        .status(403)
        .json({ message: '게시글을 수정할 수 있는 권한이 없습니다.' });
    }

    // 게시글 업데이트
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      {
        userId,
        title,
        content,
        hashtag,
        image
      },
      { new: true, runValidators: true }
    );

    const response = {
      title: updatedBoard.title,
      content: updatedBoard.content,
      hashtag: updatedBoard.hashtag,
      image: updatedBoard.image,
      createdAt: updatedBoard.createdAt,
      updatedAt: updatedBoard.updatedAt
    };

    res
      .status(200)
      .json({ message: '게시글 수정이 완료되었습니다.', response });
  } catch (err) {
    next(err);
  }
};

/** 게시글 삭제 컨트롤러 */
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
      throw new NotFound('게시물을 찾을 수 없습니다.');
    }

    // 권한 검증
    if (userId !== board.userId.toString()) {
      return res
        .status(403)
        .json({ message: '게시물을 삭제할 수 있는 권한이 없습니다.' });
    }

    // 게시물 삭제
    await Board.findByIdAndDelete(boardId);

    res.status(200).json({ message: '게시물 삭제가 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
};
