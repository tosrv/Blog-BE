import Joi from "joi";

const emailField = Joi.string().email().required();
const passwordField = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
  .required();
const nameField = Joi.string().min(3).required();

export const registerSchema = Joi.object({
  email: emailField,
  name: nameField,
  password: passwordField,
});

export const loginSchema = Joi.object({
  email: emailField,
  password: passwordField,
});
