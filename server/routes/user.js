import express from 'express';
import { register, login, logout } from '../controllers/userController.js';
import authenticateUser from '../middlewares/authenticateMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', authenticateUser, logout); // 로그아웃은 인증된 사용자만 가능

export default userRouter;
