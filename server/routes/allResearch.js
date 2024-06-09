import express from 'express';
import { allDataPerPage } from '../controllers/allResearchController.js';
const allResearchRoutes = express.Router();

// 전체 데이터 페이지별 조회
allResearchRoutes.get('/', allDataPerPage);

export default allResearchRoutes;
