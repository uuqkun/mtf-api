import Joi from "joi";

const createGroupValidation = Joi.object({
  groupName: Joi.string().min(3).max(20).required(),
  paymentProofUrl: Joi.string().uri().required(),
});

const updateGroupValidation = Joi.object({
  groupName: Joi.string().min(3).max(20).optional(),
});

export { createGroupValidation, updateGroupValidation };
