import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().allow("").optional(),
});
