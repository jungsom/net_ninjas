import express from 'express';
import { allDataPerPage } from '../controllers/allResearchController.js';
const router = express.Router();

// 전체 데이터 페이지별 조회
router.get('/', allDataPerPage);

export default router;
