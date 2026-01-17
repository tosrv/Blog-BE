import Joi from "joi";
import { registerSchema } from "./auth";

const emailField = registerSchema.extract("email");
const nameField = registerSchema.extract("name");
const passwordField = registerSchema.extract("password");

export const updateSchema = Joi.object({
  email: emailField,
  name: nameField,
});

export const deleteSchema = Joi.object({
  password: passwordField,
});
