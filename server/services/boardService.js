import Board from '../models/board.js';
import Like from '../models/like.js';
import Comment from '../models/comment.js';

export async function getBoardWithDetails(board, userId) {
  const comments = await Comment.find({
    boardId: board._id
  }).select('-userId -boardId');

  const likes = await Like.find({ boardId: board._id }).select(
    '-_id -boardId -__v'
  );

  const userIdByPost = await Board.findOne({ _id: board._id });
  const isUser = userId == userIdByPost.userId ? 'true' : 'false';
  return { ...board, comments, likes, isUser };
}

export async function getBoardWithCounts(boards, userId) {
  const boardsWithCounts = await Promise.all(
    boards.map(async (board) => {
      const commentsCount = await Comment.countDocuments({
        boardId: board._id
      });
      const likesCount = await Like.countDocuments({ boardId: board._id });

      const userIdByPost = await Board.findOne({ _id: board._id });
      const isUser = userId == userIdByPost.userId ? 'true' : 'false';
      return { ...board, commentsCount, likesCount, isUser };
    })
  );
  return boardsWithCounts;
}
