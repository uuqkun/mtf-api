import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/error.js";
import {
  createGroupValidation,
  updateGroupValidation,
} from "../validation/group-validation.js";
import { validate } from "../validation/validation.js";

const create = async (userId, body) => {
  const data = validate(createGroupValidation, body);

  // CHECK IF GROUP NAME ALREADY EXIST
  const isExist = await prismaClient.group.findUnique({
    where: { groupName: data.groupName },
  });

  if (isExist) {
    throw new ResponseError(400, "Group name already exist");
  }

  // CREATE NEW GROUP
  const newGroup = await prismaClient.group.create({
    data: data
  });

  // ADD GROUP ID TO USER
  await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      groupId: newGroup.groupId,
    },
  });

  return newGroup;
};

const update = async (groupId, body) => {
  const group = validate(updateGroupValidation, body);

  const isExist = await prismaClient.group.findFirst({
    where: { groupId: groupId },
  });

  if (!isExist) {
    throw new ResponseError(404, "Group not found");
  }

  return prismaClient.group.update({
    where: { groupId: groupId },
    data: group,
  });
};

const remove = async (groupId) => {
  const isExist = await prismaClient.group.findFirst({
    where: { groupId: groupId },
  });

  if (!isExist) {
    throw new ResponseError(404, "Group not found");
  }

  // DELETE CORRESPONDING MEMBERS
  await prismaClient.member.deleteMany({
    where: { groupId: groupId },
  });

  // DELETE GROUP
  return prismaClient.group.delete({
    where: { groupId: groupId },
  });
};

const getGroupCredentials = async (groupId) => {
  const group = await prismaClient.group.findFirst({
    where: { groupId: groupId },
  });

  const members = await prismaClient.member.findMany({
    where: {
      groupId: groupId,
    },
    select: {
      memberId: true,
      fullname: true,
      email: true,
      phoneNumber: true,
      role: true,
      createdAt: true,
    },
  });

  if (!group) {
    throw new ResponseError(404, "Group not found");
  }

  return {
    ...group,
    members: members,
  };
};
export default { create, update, remove, getGroupCredentials };
