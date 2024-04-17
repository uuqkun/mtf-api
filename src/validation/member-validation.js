import Joi from "joi";

const createMemberValidation = Joi.object({
    fullname: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().max(15).required(),
    role: Joi.string().max(50).required(),
});

export {  createMemberValidation}