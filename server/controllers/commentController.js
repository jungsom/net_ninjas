import Comment from '../models/comment.js';
import { paginateData } from '../services/allResearchService.js';
import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';

// 게시글에 대한 모든 댓글 조회 (페이지네이션)
export const getCommentsByBoardId = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const perPage = parseInt(req.query.perPage) || 20; 
    const pageNo = parseInt(req.query.pageNo) || 1; 

    // 요청 변수 검증
    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    const comments = await Comment.find().lean();

    console.log(comments)


    // 페이지네이션
    const paginatedcomment = paginateData(comments, perPage, pageNo);

    if (paginatedcomment.paginatedData.length === 0) {
      throw new NotFound('댓글을 찾을 수 없습니다.');
    }

    res.json(paginatedcomment);
  } catch (err) {
    next(err);
  }
};


// 댓글 작성
export const createComment = async (req, res, next) => {
  const { boardId } = req.params
  const { content } = req.body;
  const userId = req.user.id;

  // 요청 변수 검증
  if (!boardId || !content) {
    return next(new NotFound('요청 변수를 찾을 수 없습니다.'));
  }

  // 댓글 내용 검증
  if (!content.trim()) {
    return res.status(200).json({ message: '댓글 내용을 입력해주세요.' });
  } else if (content.length > 500) {
    return res.status(200).json({ message: '댓글은 최대 100자까지 입력 가능합니다.' });
  }

  try {
    const comment = await Comment.create({
      userId,
      boardId,
      content
    });

    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};


// 댓글 수정
export const updateCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // 요청 변수 검증
    if ( !content || !commentId ) {
      throw new NotFound('요청 변수를 찾을 수 없습니다.');
    }

    // 댓글 검증
    if (content.trim().length === 0) {
      return res.status(200).json({ message: '댓글 내용을 입력해주세요.' });
    } else if (content.length > 500) {
      return res.status(200).json({ message: '댓글은 최대 100자까지 입력 가능합니다.' });
    }

    // 권한 검증
    if (userId !== Comment.userId) {
      return res.status(403).json({ message: '댓글을 수정할 수 있는 권한이 없습니다.' });
    }

    // 댓글 업데이트
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        userId,
        content,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: '댓글 수정이 완료되었습니다.', updatedComment });
  } catch (err) {
    next(err);
  }
};

export const deleteCommentById = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    // 요청 변수 검증
    if ( !commentId ) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    // 게시물 조회
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new NotFound('댓글을 찾을 수 없습니다.');
    }

    // 권한 검증
    if (userId !== Comment.userId.toString()) {
      return res.status(403).json({ message: '댓글을 삭제할 수 있는 권한이 없습니다.' });
    }

    // 댓글 삭제
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: '댓글 삭제가 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
};

