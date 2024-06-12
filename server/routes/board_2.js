// import { Router } from 'express';
// import Board from '../models/board.js'
// import Comment from '../models/comment.js'
// import { paginateData } from '../services/allResearchService.js'
// import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';

// const boardRouter = Router();

// // 전체 게시판 조회
// boardRouter.get('/', async (req, res, next) => {
//     const perPage = parseInt(req.query.perPage) || 20;
//     const pageNo = parseInt(req.query.pageNo) || 1;
//     try {
//         const data = await Board.find().lean();
//         const paginatedData = paginateData(data, perPage, pageNo);

//         res.json(paginatedData);
//     } catch(err) {
//         next(err);
//     }
// });


// // 특정 게시물 작성
// boardRouter.post('/', async (req, res, next) => {
//     const { userId, title, content, hashtag } = req.body;
//     const set = new Set(hashtag);

//     if (!userId || !title || !content ) {
//         throw new NotFound('요청 변수를 찾을 수 없습니다.')
//     } 
    
//     if (!title.length || !content.length ) {
//         res.status(200).json({ message: '제목 혹은 내용을 입력해주세요.'})
//     } else if ( title.length > 20 ) {
//         res.status(200).json({ message: '제목은 최대 20자까지 입력 가능합니다.'})
//     }

//     if ( hashtag.length !== set.size) {
//         res.status(200).json({ message: '중복된 태그를 사용할 수 없습니다.'})
//     }

//     try {
//         const board = await Board.create(
//             {
//             userId: userId,
//             title: title,
//             content: content,
//             hashtag: hashtag
//             }
//         );

//         res.json(board);
        
//     } catch (err) {
//         next(err);
//     }
// })

// // 특정 게시물 조회
// boardRouter.get('/:boardId', async (req, res, next) => {
//     const { boardId } = req.params;

//     if (!boardId) {
//         throw new BadRequest('요청 변수를 찾을 수 없습니다.')
//     }
//     try {       
//         const board = await Board.findById(boardId).lean();

//         if (!board) {
//             throw new NotFound('게시물을 찾을 수 없습니다.')
//         }

//         res.json(board);

//     } catch (err) {
//         next(err);
//     }
//  })

// // 특정 게시물 수정
// boardRouter.put('/:boardId', async (req, res, next) => {
//     const { boardId } = req.params;
//     const { userId, title, content, hashtag } = req.body;

//     const set = new Set(hashtag);

//     if (!boardId | !userId | !title | !content ) {
//         throw new BadRequest('요청 변수를 찾을 수 없습니다.')
//     } 

//     if (!title.length || !content.length) {
//         return res.status(400).json({ message: '제목 혹은 내용을 입력해주세요.' });
//     } else if (title.length > 20) {
//         return res.status(400).json({ message: '제목은 최대 20자까지 입력 가능합니다.' });
//     }
    
//     if ( hashtag.length !== set.size) {
//         res.status(200).json({ message: '중복된 태그를 사용할 수 없습니다.'})
//     }

//     try {
//         const board = await Board.findByIdAndUpdate(
//         boardId,
//         {
//             userId: userId,
//             title: title,
//             content: content,
//             hashtag: hashtag
//         },
//         { new: true, runValidators: true });

//         if (!board) {
//             throw new NotFound('게시물을 찾을 수 없습니다.')
//         }

//         res.json({ message: "게시물 수정이 완료되었습니다.", board });
//     } catch(err) {
//         next(err);
//     }

// })

// // 특정 게시물 삭제
// boardRouter.delete('/:boardId', async (req, res, next) => {
//     const { boardId } = req.params;

//     if (!boardId ) {
//         throw new BadRequest('요청 변수를 찾을 수 없습니다.')
//     }

//     try {
//         const board = await Board.findByIdAndDelete(boardId)

//         if (!board) {
//             throw new NotFound('게시물을 찾을 수 없습니다.')
//         }

//         res.json({ message: "게시물 삭제가 완료되었습니다.", board });

//     } catch(err) {
//         next(err);
//     }
// })


// // 특정 댓글 작성
// boardRouter.post('/:boardId/comment', async (req, res, next) => {
//     const { boardId } = req.params;
//     const { userId, content } = req.body;

//     const comment = await Comment.create(
//         {
//         boardId: boardId,
//         userId: userId,
//         content: content
//         }
//     );
//     res.json(comment);
// })

// // 특정 게시물의 전체 댓글 조회
// boardRouter.get('/:boardId/comment', async (req, res, next) => {
//     const { boardId } = req.params;
//     const comment = await Comment.findById(boardId).lean();

//     res.json(comment);
// })

// // 특정 댓글 수정
// boardRouter.put('/:boardId/comment/:commentId', async (req, res, next) => {
//     const { boardId } = req.params;
//     const { userId, content } = req.body;

//     const comment = await Comment.findByIdAndUpdate(
//         {
//         boardId: boardId,
//         userId: userId,
//         content: content
//         },
//         { new: true, runValidators: true }
//     );

//     res.json({ message: "댓글 수정이 완료되었습니다.", comment });
// })

// // 특정 댓글 삭제
// boardRouter.delete('/:commentId', async (req, res, next) => {
//     const { boardId } = req.params;

//     const comment = await Comment.findByIdAndDelete(boardId)

//     res.json({ message: "댓글 삭제가 완료되었습니다.", comment });
// })

// export default boardRouter;
