import Joi from "joi";

const nameSchema = Joi.string().alphanum().min(4).max(30).required();
const passwordSchema = Joi.string()
  .min(8)
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required();

export const registerUserSchema = Joi.object({
  username: nameSchema,
  fullname: nameSchema,
  password: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  gender: Joi.string().valid("male", "female").required(),
});

export const loginUserSchema = Joi.object({
  username: nameSchema,
  password: passwordSchema,
});
