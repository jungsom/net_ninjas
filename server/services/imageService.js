import supabase from '../config/supabase.js';
import { InternalServerError } from '../middlewares/errorMiddleware.js';
import sharp from 'sharp';

const sanitizeFileName = (fileName) => {
  return fileName.replace(/[^a-zA-Z0-9.]/g, '_');
};

const uploadAndResizeImage = async (file, bucket) => {
  const { originalname, buffer } = file;
  const sanitizedFileName = sanitizeFileName(originalname);
  const encodedFileName = encodeURIComponent(sanitizedFileName);

  // Supabase에 이미지 업로드
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(encodedFileName, buffer, { upsert: true });

  if (uploadError) {
    console.error(uploadError);
    throw new InternalServerError('이미지를 업로드 하는데 실패했습니다.');
  }

  // Sharp를 사용하여 이미지 리사이징
  const resizedBuffer = await sharp(buffer)
    .resize(500, 700, { fit: 'contain' })
    .toBuffer();

  // 리사이징된 이미지 경로 생성
  const resizedFilePath = `resized-${encodedFileName}`;

  // 이미지 변환 API
  const { error: resizeError } = await supabase.storage
    .from(bucket)
    .upload(resizedFilePath, resizedBuffer, {
      transform: {
        width: 500,
        height: 700,
        fit: 'contain'
      }
    });

  if (resizeError) {
    console.error(resizeError);
    throw new InternalServerError('이미지를 리사이징 하는데 실패했습니다.');
  }

  return resizedFilePath;
};

// 게시글 이미지 리사이징
const resizeBoardImage = async (req, res, next) => {
  if (!req.files) return next();

  try {
    req.files = await Promise.all(
      req.files.map(async (file) => {
        const resizedFilePath = await uploadAndResizeImage(file, 'boardImages');
        return { ...file, path: resizedFilePath };
      })
    );
    next();
  } catch (error) {
    next(error);
  }
};

// 프로필 이미지 리사이징
const resizeProfileImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const resizedFilePath = await uploadAndResizeImage(
      req.file,
      'profileImages'
    );
    req.file.path = resizedFilePath;
    next();
  } catch (error) {
    next(error);
  }
};

export { resizeBoardImage, resizeProfileImage };
