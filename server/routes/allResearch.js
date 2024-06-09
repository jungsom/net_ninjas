import express from 'express';
import { allDataPerPage } from '../controllers/allResearchController.js';
const allResearchRouter = express.Router();

// 전체 데이터 페이지별 조회
allResearchRouter.get('/', allDataPerPage);

export default allResearchRouter;
