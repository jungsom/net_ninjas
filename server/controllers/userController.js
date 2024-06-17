import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/index.js';
import { BadRequest, NotFound } from '../middlewares/errorMiddleware.js';
import {
  registerSchema,
  loginSchema,
  updateUserSchema
} from '../validations/userValidation.js';

// 회원가입 컨트롤러
export async function register(req, res, next) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw new BadRequest(error.message);

    const { email, password, name, nickname } = req.body;
    const profileImage = req.file
      ? req.file.path
      : 'uploads/profileImages/defaultImage.png';

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
    const { error } = loginSchema.validate(req.body);
    if (error) throw new BadRequest(error.details[0].message);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new NotFound('등록된 이메일이 없습니다');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequest('비밀번호가 일치하지 않습니다');

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: '7d'
    }); // 토큰 유효기간: 7일

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 쿠키 유효기간: 7일
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
    const { password, nickname } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    if (!password && !nickname && !profileImage) {
      throw new BadRequest('변경할 정보를 입력하세요.');
    }

    const { error } = updateUserSchema.validate(req.body);
    if (error) throw new BadRequest(error.details[0].message);

    const updatedData = {};
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }
    if (nickname) updatedData.nickname = nickname;
    if (name) updatedData.name = name;
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
