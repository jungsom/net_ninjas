import express from 'express';
import cors from 'cors';
import allResearchRoutes from './routes/allResearch.js';
import recommendRouter from './routes/recommend.js';
import userRouter from './routes/user.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import dotenv from 'dotenv';

import './config/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/', userRouter);
app.use('/allResearch', allResearchRoutes);
app.use('/recommend', recommendRouter);

// 에러 처리 미들웨어
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
