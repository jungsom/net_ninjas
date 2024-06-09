import express from 'express';
import { searchData } from '../controllers/researchSearchController.js';
const router = express.Router();

router.get('/', searchData);

export default router;
