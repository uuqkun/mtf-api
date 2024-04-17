import groupService from "../service/group-service.js";

const create = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.userId;

    const result = await groupService.create(userId, body);

    res.status(200).json({
      message: "Successfully registered a new group",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const body = req.body;
    const groupId = req.params.groupId;
    const result = await groupService.update(groupId, body);

    res.status(200).json({
      message: "Successfully updated group data",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    await groupService.remove(groupId);

    res.status(200).json({
      message: "Successfully deleted group",
    });
  } catch (e) {
    next(e);
  }
};

const getGroupCredentials = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const result = await groupService.getGroupCredentials(groupId);

    res.status(200).json({
      message: "Successfully retrieved group credentials",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  update,
  remove,
  getGroupCredentials,
};
