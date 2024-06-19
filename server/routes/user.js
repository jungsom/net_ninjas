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
import { resizeProfileImage } from '../services/imageService.js';

const userRouter = express.Router();

userRouter.post('/register', uploadProfileImage, resizeProfileImage, register);
userRouter.post('/login', login);
userRouter.post('/logout', authenticateUser, logout);
userRouter.get('/', authenticateUser, getUserInfo);
userRouter.put(
  '/',
  authenticateUser,
  uploadProfileImage,
  resizeProfileImage,
  updateUserInfo
);
userRouter.delete('/', authenticateUser, deleteUser);

export default userRouter;
