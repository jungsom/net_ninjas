import Board from '../models/board.js';
import { paginateData } from '../services/allResearchService.js';
import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';

export const getAllBoards = async (req, res, next) => {
    try {
        const perPage = parseInt(req.query.perPage) || 20;
        const pageNo = parseInt(req.query.pageNo) || 1;

        const data = await Board.find().lean();

        const paginatedData = paginateData(data, perPage, pageNo);

        if ( paginatedData.paginatedData.length === 0 ) {
            throw new NotFound('게시글을 찾을 수 없습니다.')
        } 

        res.json(paginatedData);
    } catch (err) {
        next(err);
    }
};

export const createBoard = async (req, res, next) => {
    const { userId, title, content, hashtag } = req.body;
    const set = new Set(hashtag);

    if (!userId || !title || !content ) {
        throw new NotFound('요청 변수를 찾을 수 없습니다.')
    } 
    
    if (title.trim().length === 0 || content.trim().length === 0 ) {
        return res.status(200).json({ message: '제목 혹은 내용을 입력해주세요.'})
    } else if ( title.length > 20 ) {
        return res.status(200).json({ message: '제목은 최대 20자까지 입력 가능합니다.'})
    }

    if ( hashtag ) {
        if (hashtag.length !== set.size) {
        return res.status(200).json({ message: '중복된 태그를 사용할 수 없습니다.'})
    }}

    try {
        const board = await Board.create(
            {
            userId: userId,
            title: title,
            content: content,
            hashtag: hashtag
            }
        );

        res.json(board);
        
    } catch (err) {
        next(err);
    }
};

export const getBoardById = async (req, res, next) => {
    const { boardId } = req.params;

    if (!boardId) {
        throw new BadRequest('요청 변수를 찾을 수 없습니다.')}

    try {       
        const board = await Board.findById(boardId).lean();

        if (!board) {
            throw new NotFound('게시물을 찾을 수 없습니다.')
        }

        res.json(board);

    } catch (err) {
        next(err);
    }
};

export const updateBoardById = async (req, res, next) => {
    const { boardId } = req.params;
    const { userId, title, content, hashtag } = req.body;

    const set = new Set(hashtag);

    if (!boardId || !userId || !title || !content ) {
        throw new NotFound('요청 변수를 찾을 수 없습니다.')
    } 
    
    if (title.trim().length === 0 || content.trim().length === 0 ) {
        return res.status(200).json({ message: '제목 혹은 내용을 입력해주세요.'})
    } else if ( title.length > 20 ) {
        return res.status(200).json({ message: '제목은 최대 20자까지 입력 가능합니다.'})
    }

    if ( hashtag ) {
        if (hashtag.length !== set.size) {
        return res.status(200).json({ message: '중복된 태그를 사용할 수 없습니다.'})
    }}

    try {
        const board = await Board.findById(boardId);

        if (!board) {
            throw new NotFound('게시물을 찾을 수 없습니다.');
        }

        if (userId !== board.userId.toString()) {
            return res.status(200).json({ message: '게시물을 수정할 수 있는 권한이 없습니다.'}) // 403 Forbidden으로 수정 예정
        }

        const updatedBoard = await Board.findByIdAndUpdate(
        boardId,
        {
            userId: userId,
            title: title,
            content: content,
            hashtag: hashtag
        },
        { new: true, runValidators: true });

        res.json({ message: "게시물 수정이 완료되었습니다.", updatedBoard });
    } catch(err) {
        next(err);
    }
};

export const deleteBoardById = async (req, res, next) => {
    const { boardId } = req.params;

    if (!boardId ) {
        throw new BadRequest('요청 변수를 찾을 수 없습니다.')}

    try {
        const board = await Board.findById(boardId);

        if (!board) {
            throw new NotFound('게시물을 찾을 수 없습니다.');
        }

        if (userId !== board.userId.toString()) {
            return res.status(200).json({ message: '게시물을 수정할 수 있는 권한이 없습니다.'}) // 403 Forbidden으로 수정 예정
        }

        const deletedBoard = await Board.findByIdAndDelete(boardId)

        if (!board) {
            throw new NotFound('게시물을 찾을 수 없습니다.')
        }

        res.json({ message: "게시물 삭제가 완료되었습니다." });

    } catch(err) {
        next(err);
    }
};
