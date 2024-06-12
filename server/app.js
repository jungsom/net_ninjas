import express from 'express';
import cors from 'cors';
import allResearchRoutes from './routes/allResearch.js';
import recommendRouter from './routes/recommend.js';
import userRouter from './routes/user.js';
import placeRouter from './routes/place.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import dotenv from 'dotenv';

import './config/db.js';
import boardRouter from './routes/board.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/', userRouter);
app.use('/allResearch', allResearchRoutes);
app.use('/allPlace', placeRouter);
app.use('/recommend', recommendRouter);
app.use('/board', boardRouter);

// 에러 처리 미들웨어
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
