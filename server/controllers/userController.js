import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/index.js';
import {
  BadRequest,
  NotFound,
  Forbidden
} from '../middlewares/errorMiddleware.js';

// 이메일 형식 검사 정규식 (@ 앞뒤로 공백없는 문자, 도메인 '.'포함)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 비밀번호 검사 정규식 (8자 이상, 특수문자 포함)
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// 회원가입 컨트롤러
export async function register(req, res, next) {
  try {
    const { email, password, name, nickname } = req.body;
    const profileImage = req.file
      ? req.file.path
      : 'uploads/profileImages/defaultImage.png';

    if (!email) throw new BadRequest('이메일을 입력하세요.');
    if (!emailRegex.test(email))
      throw new BadRequest('유효한 이메일 형식이 아닙니다.');
    if (!password) throw new BadRequest('비밀번호를 입력하세요');
    if (!passwordRegex.test(password))
      throw new BadRequest(
        '비밀번호는 8자 이상이고 특수문자를 포함해야 합니다.'
      );
    if (!name || !name.trim()) throw new BadRequest('이름을 입력하세요.');
    if (!nickname || !nickname.trim())
      throw new BadRequest('닉네임을 입력하세요.');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequest('이미 사용 중인 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      name,
      nickname,
      profileImage
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

// 사용자 정보 조회 컨트롤러
export async function getUserInfo(req, res, next) {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-_id -password').lean();
    if (!user) throw new NotFound('등록된 회원이 아닙니다.');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// 사용자 정보 수정 컨트롤러
export async function updateUserInfo(req, res, next) {
  try {
    const userId = req.user.id;
    const { name, nickname, password } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    if (!password && !nickname && !profileImage) {
      throw new BadRequest('변경할 정보를 입력하세요.');
    }

    const updatedData = {};
    if (password) {
      if (!passwordRegex.test(password)) {
        throw new BadRequest(
          '비밀번호는 8자 이상이고 특수문자를 포함해야 합니다.'
        );
      }
      updatedData.password = await bcrypt.hash(password, 10);
    }
    if (nickname) updatedData.nickname = nickname;
    if (profileImage) updatedData.profileImage = profileImage;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true
    })
      .select('-_id -password')
      .lean();
    if (!updatedUser) throw new NotFound('등록된 회원이 아닙니다.');

    res
      .status(200)
      .json({ user: updatedUser, message: '회원 정보가 수정되었습니다.' });
  } catch (error) {
    next(error);
  }
}

// 회원 탈퇴 컨트롤러
export async function deleteUser(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new NotFound('등록된 회원이 아닙니다.');
    res.cookie('token', '', { maxAge: 0 });

    res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' });
  } catch (error) {
    next(error);
  }
}
