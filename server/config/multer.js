import multer from 'multer';
import { BadRequest } from '../middlewares/errorMiddleware.js';

// 이미지 저장소 설정
const storage = multer.memoryStorage();

// 파일 형식 필터
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(new BadRequest('이미지 파일만 업로드할 수 있습니다.'));
  }
};

const uploadBoardImage = multer({ storage, fileFilter }).array('image', 5);
const uploadProfileImage = multer({ storage, fileFilter }).single(
  'profileImage'
);

export { uploadBoardImage, uploadProfileImage };
