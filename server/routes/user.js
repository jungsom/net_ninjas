import {login, logout} from "../controllers/userController.js";
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/login', login);
userRouter.get('/logout', logout);

export default userRouter;
