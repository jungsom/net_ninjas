import express from 'express';
import { allDataPerPage } from '../controllers/placeController.js';

const placeRouter = express.Router();

placeRouter.get('/', allDataPerPage);

export default placeRouter;
