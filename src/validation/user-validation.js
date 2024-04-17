import Joi from "joi";

const registerUserValidation = Joi.object({
  fullname: Joi.string().max(100).required(),
  phoneNumber: Joi.string().max(100).optional(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().max(100).email().required(),
  password: Joi.string().max(100).required(),
});

const updateValidatedUser = Joi.object({
  fullname: Joi.string().max(100).optional(),
  phoneNumber: Joi.string().max(100).optional(),
  email: Joi.string().max(100).email().optional(),
  password: Joi.string().max(100).optional(),
});

export { registerUserValidation, loginUserValidation, updateValidatedUser };
