import Joi from "joi";

import { validator } from "./validator.js";

const conversationSchema = Joi.object({
  type: Joi.string().valid("direct", "group").required(),
  participants: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  name: Joi.string()
    .trim()
    .when("type", {
      is: Joi.string().valid("group"),
      then: Joi.string().required(),
      otherwise: Joi.allow(""),
    }),
});

export const validateConversation = validator(conversationSchema);
