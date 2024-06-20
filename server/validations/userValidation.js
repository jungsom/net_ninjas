import Joi from 'joi';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>+\-=_]).{8,}$/;
const noSpacesRegex = /^\S+$/;

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': '유효한 이메일 형식이 아닙니다.',
    'any.required': '이메일을 입력하세요.'
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      '비밀번호는 8자 이상이고 특수문자를 포함해야 합니다.',
    'any.required': '비밀번호를 입력하세요.'
  }),
  name: Joi.string().trim().pattern(noSpacesRegex).required().messages({
    'string.pattern.base': '이름에 공백이 포함될 수 없습니다.',
    'any.required': '이름을 입력하세요.'
  }),
  nickname: Joi.string().trim().pattern(noSpacesRegex).required().messages({
    'string.pattern.base': '닉네임에 공백이 포함될 수 없습니다.',
    'any.required': '닉네임을 입력하세요.'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': '유효한 이메일 형식이 아닙니다.',
    'any.required': '이메일을 입력하세요.'
  }),
  password: Joi.string().required().messages({
    'any.required': '비밀번호를 입력하세요'
  })
});

export const updateUserSchema = Joi.object({
  password: Joi.string().pattern(passwordRegex).optional().messages({
    'string.pattern.base': '비밀번호는 8자 이상이고 특수문자를 포함해야 합니다.'
  }),
  nickname: Joi.string().trim().pattern(noSpacesRegex).optional().messages({
    'string.pattern.base': '닉네임에 공백이 포함될 수 없습니다.'
  })
});
