import express from 'express';
import { allDataPerPage } from '../controllers/allResearchController.js';
import { searchData } from '../controllers/allResearchSearchController.js';
import { getCategoryData } from '../controllers/allResearchByCategoryController.js';

const allResearchRouter = express.Router();

// 전체 데이터 페이지별 조회
allResearchRouter.get('/', allDataPerPage);
allResearchRouter.get('/search', searchData);
allResearchRouter.get('/:category', getCategoryData);

export default allResearchRouter;
