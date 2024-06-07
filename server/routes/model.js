import express from 'express';
import { getModelData } from '../controllers/modelController.js';

const router = express.Router();

// 특정 모델의 전체 데이터 가져오기
router.post('/model-data', getModelData);

export default router;
