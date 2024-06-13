import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import allResearchRouter from './routes/allResearch.js';
import boardRouter from './routes/board.js';
import placeRouter from './routes/place.js';
import recommendRouter from './routes/recommend.js';
import userRouter from './routes/user.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

import './config/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// router
app.use('/allResearch', allResearchRouter);
app.use('/board', boardRouter);
app.use('/allPlace', placeRouter);
app.use('/recommend', recommendRouter);
app.use('/user', userRouter);

// 에러 처리 미들웨어
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
