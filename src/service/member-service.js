import { response } from "express";
import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/error.js";
import { createMemberValidation } from "../validation/member-validation.js";
import { validate } from "../validation/validation.js";

const create = async (body) => {
  const newMember = validate(createMemberValidation, body);

  const user = await prismaClient.member.findUnique({
    where: {
      email: newMember.email,
    },
  });

  if (user) {
    throw new ResponseError(400, "Cannot use this credentials");
  }

  return prismaClient.member.create({
    data: newMember,
    select: {
      memberId: true,
      fullname: true,
      groupId: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });
};

const createMany = async (body) => {
  const members = [
    {
      fullname: "John Doe",
      email: "john@gmail.com",
      phoneNumber: "08123456789",
      role: "Hacker",
    },
    {
      fullname: "Anna",
      email: "anna@gmail.com",
      phoneNumber: "08123456789",
      role: "Hustler",
    },
  ];

  const newMembers = [];

  body.map((member) => {
    newMembers.push(validate(createMemberValidation, member));
  });

  console.log(body);

  return prismaClient.member.createMany({
    data: newMembers,
  });
};

const update = async () => {};

const remove = async () => {};

const getMembers = async () => {
  return prismaClient.member.findMany({
    select: {
      memberId: true,
      fullname: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });
};

export default { create, createMany, update, remove, getMembers };
