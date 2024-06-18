import Joi from 'joi';

export const boardSchema = Joi.object({
  title: Joi.string().trim().max(30).required(),
  content: Joi.string().trim().max(1000).required()
});

export const commentSchema = Joi.object({
  content: Joi.string().trim().max(100).required()
});
