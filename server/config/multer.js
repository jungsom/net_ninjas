import multer from 'multer';
import path from 'path';
import { BadRequest } from '../middlewares/errorMiddleware.js';

// 이미지 저장소 설정
const boardStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/boardImages/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profileImages/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// 파일 형식 필터
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(new BadRequest('이미지 파일만 업로드할 수 있습니다.'));
  }
};

const uploadBoardImage = multer({
  storage: boardStorage,
  fileFilter: fileFilter
});

const uploadProfileImage = multer({
  storage: profileStorage,
  fileFilter: fileFilter
});

export { uploadBoardImage, uploadProfileImage };
