import express from 'express';
import { allDataPerPage } from '../controllers/allResearchController.js';
import { searchData } from '../controllers/allResearchSearchController.js';
import { allDataByCategoryPerPage } from '../controllers/allResearchByCategoryController.js';

const allResearchRouter = express.Router();

// 전체 데이터 페이지별 조회
allResearchRouter.get('/', allDataPerPage);
allResearchRouter.get('/search', searchData);
allResearchRouter.get('/convenience', allDataByCategoryPerPage('Convenience'));
allResearchRouter.get('/education', allDataByCategoryPerPage('Education'));
allResearchRouter.get('/environment', allDataByCategoryPerPage('Environment'));
allResearchRouter.get('/housing', allDataByCategoryPerPage('Housing'));
allResearchRouter.get('/population', allDataByCategoryPerPage('Population'));
allResearchRouter.get('/safety', allDataByCategoryPerPage('Safety'));
allResearchRouter.get('/transportation',allDataByCategoryPerPage('Transportation'));
allResearchRouter.get('/welfare', allDataByCategoryPerPage('Welfare'));

export default allResearchRouter;
