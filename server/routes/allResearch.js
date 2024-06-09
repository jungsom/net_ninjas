import express from 'express';
import { allDataPerPage } from '../controllers/allResearchController.js';
import { searchData } from '../controllers/allResearchSearchController.js';

const allResearchRoutes = express.Router();

// 전체 데이터 페이지별 조회
allResearchRoutes.get('/', allDataPerPage);
allResearchRoutes.get('/search', searchData);

export default allResearchRoutes;
