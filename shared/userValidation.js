import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { validator } from "./validator.js";

//instead of writing patterns for password validation, we can use joi-password-complexity library
const passwordComplexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const passwordSchema = passwordComplexity(passwordComplexityOptions).messages({
  "string.base": "{#label} should be a string.",
  "string.empty": "{#label} is required.",
  "string.min": "{#label} must be at least {#min} characters long.",
  "string.max": "{#label} must be no more than {#max} characters long.",
  "string.pattern.base":
    "{#label} must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  "any.required": "{#label} is required.",
});

const nameSchema = Joi.string().alphanum().min(4).max(30).required().messages({
  "string.alphanum": "{#label} should only contain letters and numbers.",
  "string.min": "{#label} must be at least 4 characters long.",
  "string.max": "{#label} must be less than 30 characters.",
  "any.required": "{#label} is required.",
  "string.empty": "{#label} is required",
});

export const registerUserSchema = Joi.object({
  username: nameSchema.label("Username"),
  fullname: nameSchema.label("Fullname"),
  password: passwordSchema.label("Password"),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender must be either male or female.",
    "any.required": "Gender is required",
  }),
});

export const loginUserSchema = Joi.object({
  username: nameSchema,
  password: passwordSchema,
});

export const validateRegisterUser = validator(registerUserSchema);
export const validateLoginUser = validator(loginUserSchema);
