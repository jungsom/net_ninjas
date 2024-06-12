import { Router } from 'express';
import Board from '../models/board.js'
import { paginateData } from '../services/allResearchService.js'
import { BadRequest } from '../middlewares/errorMiddleware.js';

const boardRouter = Router();

// 전체 게시판 조회
boardRouter.get('/', async (req, res, next) => {
    const perPage = parseInt(req.query.perPage) || 20;
    const pageNo = parseInt(req.query.pageNo) || 1;

    const data = await Board.find().lean();

    const paginatedData = paginateData(data, perPage, pageNo);

    res.json(paginatedData);
});


// 특정 게시물 작성
boardRouter.post('/', async (req, res, next) => {
    try {
        const { userId, title, content, hashtag } = req.body;

        if (!title || !title.length ) {
            throw new BadRequest('제목을 입력해주세요.')
        } else if (!content || !content.length) {
            throw new BadRequest('내용을 입력해주세요.')
        } else if ( title.length > 20 ) {
            throw new BadRequest('제목은 최대 20자까지 입력 가능합니다.')
        }

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
        next()
    }
})

// 특정 게시물 조회
boardRouter.get('/:boardId', async (req, res, next) => {
    const { boardId } = req.params;
    const board = await Board.findById(boardId).lean();

    res.json(board);
})

// 특정 게시물 수정
boardRouter.put('/:boardId', async (req, res, next) => {
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

    res.json({ message: "게시물 수정이 완료되었습니다.", board });
})

// 특정 게시물 삭제
boardRouter.delete('/:boardId', async (req, res, next) => {
    const { boardId } = req.params;

    const board = await Board.findByIdAndDelete(boardId)

    res.json({ message: "게시물 삭제가 완료되었습니다.", board });
})



// 특정 댓글 작성
boardRouter.post('/comment', async (req, res, next) => {
    const { userId, title, content, hashtag } = req.body;

    const board = await Board.create(
        {
        userId: userId,
        title: title,
        content: content,
        hashtag: hashtag
        }
    );
    res.json(board);
})

// 특정 게시물의 전체 댓글 조회
boardRouter.get('/:boardId/comment', async (req, res, next) => {
    const { boardId } = req.params;
    const board = await Board.findById(boardId).lean();

    res.json(board);
})

// 특정 댓글 수정
boardRouter.put('/:boardId/comment/:commentId', async (req, res, next) => {
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

    res.json({ message: "댓글 수정이 완료되었습니다.", board });
})

// 특정 댓글 삭제
boardRouter.delete('/:commentId', async (req, res, next) => {
    const { boardId } = req.params;

    const board = await Board.findByIdAndDelete(boardId)

    res.json({ message: "댓글 삭제가 완료되었습니다.", board });
})

export default boardRouter;
