import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';

// 이미지 저장소 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/boardImages/');
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

// 파일 형식 필터
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new BadRequest('이미지 파일만 업로드할 수 있습니다.'));
  }
};

// multer 설정
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

export default uploadImage;
