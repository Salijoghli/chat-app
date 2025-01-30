import Joi from "joi";

import { validator } from "./validator.js";

const conversationSchema = Joi.object({
  participants: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  name: Joi.string().required(),
});

export const validateConversation = validator(conversationSchema);
