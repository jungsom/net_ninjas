import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/index.js';
import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';

// 이메일 형식 검사 정규식 (@ 앞뒤로 공백없는 문자, 도메인 '.'포함)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 비밀번호 검사 정규식 (8자 이상, 특수문자 포함)
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// 회원가입 컨트롤러
export async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;

    if (!email) throw new BadRequest('이메일을 입력하세요.');
    if (!emailRegex.test(email))
      throw new BadRequest('유효한 이메일 형식이 아닙니다.');
    if (!password) throw new BadRequest('비밀번호를 입력하세요');
    if (!passwordRegex.test(password))
      throw new BadRequest(
        '비밀번호는 8자 이상이고 특수문자를 포함해야 합니다.'
      );
    if (!name || !name.trim()) throw new BadRequest('이름을 입력하세요.');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequest('이미 사용 중인 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      name
    });

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    next(error);
  }
}

// 로그인 컨트롤러
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email) throw new BadRequest('이메일을 입력하세요');
    if (!password) throw new BadRequest('비밀번호를 입력하세요');

    const user = await User.findOne({ email });
    if (!user) throw new NotFound('등록된 이메일이 없습니다');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequest('비밀번호가 일치하지 않습니다');

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: '1d'
    }); // 토큰 유효기간: 1일

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 쿠키 유효기간: 1일
    });

    res.status(200).json({ message: '로그인 되었습니다.' });
  } catch (error) {
    next(error);
  }
}

// 로그아웃 컨트롤러
export async function logout(req, res, next) {
  res.cookie('token', '', { maxAge: 0 });
  res.status(200).json({ message: '로그아웃 되었습니다.' });
}
