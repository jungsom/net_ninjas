import recommend from "../controllers/recommendController.js";
import { Router } from 'express';

const recommendRouter = Router();

recommendRouter.get('/', recommend);

export default recommendRouter;
