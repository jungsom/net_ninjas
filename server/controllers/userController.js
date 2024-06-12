import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/index.js';
import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';

// 이메일 유효성 검사 정규식 (@기준 도메인,로컬 유무 확인, 공백 포함 확인)
// ^:시작 [^\s@]:공백,@제외모든문자 +:한번이상 \.:문자'.' $:끝
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 비밀번호 유효성 검사 정규식 (8자 이상, 특수문자 포함)
//
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// 회원가입 컨트롤러
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name)
      return res.status(400).json({ errorMessage: '이름을 입력하세요.' });
    if (!email)
      return res.status(400).json({ errorMessage: '이메일을 입력하세요.' });
    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ errorMessage: '유효한 이메일 형식이 아닙니다.' });
    if (!password)
      return res.status(400).json({ errorMessage: '비밀번호를 입력하세요' });
    if (!passwordRegex.test(password))
      return res.status(400).json({
        errorMessage: '비밀번호는 8자 이상이고 특수문자를 포함해야 합니다.'
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ errorMessage: '이미 사용 중인 이메일입니다.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: '회원가입 성공' });
  } catch (errorMessage) {
    next(errorMessage);
  }
}

// 로그인 컨트롤러
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({ errorMessage: '이메일을 입력하세요' });
    if (!password)
      return res.status(400).json({ errorMessage: '비밀번호를 입력하세요' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ errorMessage: '등록된 이메일이 없습니다' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ errorMessage: '비밀번호가 일치하지 않습니다' });

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: '1d'
    }); // 토큰 유효기간: 1일

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000 // 쿠키 유효기간: 1일
    });

    res.status(200).json({ message: '로그인 성공' });
  } catch (errorMessage) {
    next(errorMessage);
  }
}

// 로그아웃 컨트롤러
export async function logout(req, res, next) {
  res.cookie('token', '', { maxAge: 0 });
  res.status(200).json({ message: '로그아웃 성공' });
}
