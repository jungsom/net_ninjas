import express from 'express';
import {
  register,
  login,
  logout,
  getUserInfo,
  updateUserInfo,
  deleteUser
} from '../controllers/userController.js';
import authenticateUser from '../middlewares/authenticateMiddleware.js';
import { uploadProfileImage } from '../config/multer.js';

const userRouter = express.Router();

userRouter.post(
  '/register',
  uploadProfileImage.single('profileImage'),
  register
);
userRouter.post('/login', login);
userRouter.post('/logout', authenticateUser, logout);
userRouter.get('/', authenticateUser, getUserInfo);
userRouter.put(
  '/',
  authenticateUser,
  uploadProfileImage.single('profileImage'),
  updateUserInfo
);
userRouter.delete('/', authenticateUser, deleteUser);

export default userRouter;
