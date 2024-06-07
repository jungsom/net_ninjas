// 필요한 모듈 로드
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Express 애플리케이션 생성
const app = express();

// 환경 변수에서 MongoDB 연결 정보 가져오기
const mongoURI = process.env.MONGODB_URI;

// MongoDB 연결
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error: ', err));


// 미들웨어 설정: JSON 파싱
app.use(express.json());