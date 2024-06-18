import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
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
}).array('image', 5);

const uploadProfileImage = multer({
  storage: profileStorage,
  fileFilter: fileFilter
}).single('profileImage');

// 게시글 이미지 리사이징, 누적 삭제
const resizeBoardImages = async (req, res, next) => {
  if (!req.files) return next();

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const newPath = `uploads/boardImages/resized-${file.filename}`;
        await sharp(file.path)
          .resize({
            width: 500,
            height: 700,
            fit: sharp.fit.contain
          })
          .toFile(newPath);
        // 리사이징 후 원본 파일 삭제
        fs.unlinkSync(file.path);
        // 리사이징된 파일 경로 업데이트
        file.path = newPath;
      })
    );
    next();
  } catch (error) {
    next(error);
  }
};

// 프로필 이미지 리사이징, 누적 삭제
const resizeProfileImage = async (req, res, next) => {
  if (!req.file) return next();

  const newPath = `uploads/profileImages/resized-${req.file.filename}`;

  try {
    await sharp(req.file.path)
      .resize({
        width: 500,
        height: 700,
        fit: sharp.fit.contain
      })
      .toFile(newPath);
    // 리사이징 후 원본 파일 삭제
    fs.unlinkSync(req.file.path);
    // 리사이징된 파일 경로 업데이트
    req.file.path = newPath;
    next();
  } catch (error) {
    next(error);
  }
};

export {
  uploadBoardImage,
  uploadProfileImage,
  resizeBoardImages,
  resizeProfileImage
};
