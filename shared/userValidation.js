import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

//instead of writing patterns for password validation, we can use joi-password-complexity library
const passwordComplexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
  messages: {
    requirementCount:
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.",
  },
};
const passwordSchema = passwordComplexity(passwordComplexityOptions);

const nameSchema = Joi.string().alphanum().min(4).max(30).required().messages({
  "string.alphanum": "{#label} should only contain letters and numbers.",
});

const registerUserSchema = Joi.object({
  username: nameSchema,
  fullname: nameSchema,
  password: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": `"Gender" must be either male or female.`,
  }),
});

const loginUserSchema = Joi.object({
  username: nameSchema,
  password: passwordSchema,
});

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

export const validateRegisterUser = validator(registerUserSchema);
export const validateLoginUser = validator(loginUserSchema);
