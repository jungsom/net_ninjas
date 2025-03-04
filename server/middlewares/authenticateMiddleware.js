import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { Unauthorized } from '../middlewares/errorMiddleware.js';

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return next(new Unauthorized('로그인이 필요합니다'));

  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return next(new Unauthorized('토큰이 만료되었습니다'));
      }
      return next(new Unauthorized('유효하지 않은 토큰입니다'));
    }
    req.user = { id: decoded.id };
    next();
  });
};

export default authenticateUser;
