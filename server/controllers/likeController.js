import Like from '../models/like.js';
import {
  BadRequest,
  NotFound,
  Forbidden
} from '../middlewares/errorMiddleware.js';

// 좋아요 등록, 취소 기능
export const createLikeByBoardId = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const userId = req.user.id;

    const isLiked = await Like.findOne({ userId, boardId });

    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    if (!isLiked) {
      await Like.create({
        boardId: boardId,
        userId: userId
      });
      res.status(200).json({ message: '좋아요를 눌렀습니다.' });
    } else if (isLiked) {
      await Like.findByIdAndDelete(isLiked._id);
      res.status(200).json({ message: '좋아요가 취소되었습니다.' });
    }
  } catch (err) {
    next(err);
  }
};

// 좋아요 개수 조회
export const getLikesByBoardId = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const likes = await Like.countDocuments({ boardId });

    if (!boardId) {
      throw new BadRequest('요청 변수를 찾을 수 없습니다.');
    }

    res.status(200).json(likes);
  } catch (err) {
    next(err);
  }
};
