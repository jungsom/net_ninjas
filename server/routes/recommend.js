import express from 'express';
import { recommend } from '../controllers/recommendController.js';

const recommendRouter = express.Router();

recommendRouter.get('/', recommend);

export default recommendRouter;
