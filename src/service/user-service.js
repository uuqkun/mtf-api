import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/error.js";
import {
  updateValidatedUser,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const count = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (count) {
    throw new ResponseError(400, "Cannot use this credentials");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      phoneNumber: true,
      fullname: true,
      email: true,
      createdAt: true,
    },
  });
};

const login = async (req) => {
  const loginReq = validate(loginUserValidation, req);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginReq.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, "email or password wrong");
  }

  const { password, ...result } = user;

  const isValidPassword = await bcrypt.compare(loginReq.password, password);

  if (!isValidPassword) {
    throw new ResponseError(401, "email or password wrong");
  }

  return result;
};

const update = async (id, body) => {
  const user = validate(updateValidatedUser, body);

  const countInDatabase = await prismaClient.user.count({
    where: {
      id: id,
    },
  });

  if (countInDatabase !== 1) {
    throw new ResponseError(404, "User is Not Found");
  }

  const data = body;

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      id,
    },
    data: data,
    select: {
      fullname: true,
      email: true,
      phoneNumber: true,
      password: true,
    },
  });
};

const users = async () => {
  return prismaClient.user.findMany({
    select: {
      id: true,
      fullname: true,
      groupId: true,
      email: true,
      phoneNumber: true,
      createdAt: true,
    },
  });
};

const user = async (id) => {
  return prismaClient.user.findUnique({
    where: {
      id
    }, 
    select: {
      id: true,
      fullname: true,
      groupId: true,
      email: true,
      phoneNumber: true,
      createdAt: true,
    },
  });
};

export default {
  register,
  login,
  update,
  user,
  users,
};
