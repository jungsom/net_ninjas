import express from 'express';
import { allDataPerPage } from '../controllers/allResearchController.js';
import { searchData } from '../controllers/allResearchSearchController.js';
import { allDataByCategoryPerPage } from '../controllers/allResearchByCategoryController.js';

const allResearchRoutes = express.Router();

// 전체 데이터 페이지별 조회
allResearchRoutes.get('/', allDataPerPage);
allResearchRoutes.get('/search', searchData);
allResearchRoutes.get('/convenience', allDataByCategoryPerPage('Convenience'));
allResearchRoutes.get('/education', allDataByCategoryPerPage('Education'));
allResearchRoutes.get('/environment', allDataByCategoryPerPage('Environment'));
allResearchRoutes.get('/housing', allDataByCategoryPerPage('Housing'));
allResearchRoutes.get('/population', allDataByCategoryPerPage('Population'));
allResearchRoutes.get('/safety', allDataByCategoryPerPage('Safety'));
allResearchRoutes.get('/transportation', allDataByCategoryPerPage('Transportation'));
allResearchRoutes.get('/welfare', allDataByCategoryPerPage('Welfare'));

export default allResearchRoutes;
