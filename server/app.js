import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import allResearchRouter from './routes/allResearch.js';
import researchRoutes from './routes/research.js';
import recommendRouter from './routes/recommend.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import dotenv from 'dotenv';

import './config/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/allResearch', allResearchRouter);
app.use('/research', researchRoutes);
app.use('/recommend', recommendRouter);

// 에러 처리 미들웨어
app.use(errorMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'), (err) => {
    if (err)
      res.send(
        '../client/build 폴더가 존재하지않습니다. 프론트 페이지 표시가 필요한 경우 client 폴더에서  npm run build 후 새로고침 하세요. (api는 정상작동 됩니다.)'
      );
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
