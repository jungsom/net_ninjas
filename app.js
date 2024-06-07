// 필요한 모듈 로드
import express from "express";
import path from "path";
import cors from "cors";
import dotenv from 'dotenv';

import "./server/config/db.js";

dotenv.config();

const app = express();

// // 환경 변수에서 MongoDB 연결 정보 가져오기
// const mongoURI = process.env.MONGODB_URI;

// // MongoDB 연결
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error('MongoDB Connection Error: ', err));

//   app.use(cors());


//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'../client/build/index.html'));
//   });

export default app;