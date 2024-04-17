import { logger } from "../application/logging.js";
import memberService from "../service/member-service.js";

const create = async (req, res, next) => {
  try {
    const body = req.body;

    const result = await memberService.create(body);

    res.status(200).json({
      message: "Successfully added member",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const createMany = async (req, res, next) => {
  try {
    const result = await memberService.createMany(req.body);

    res.status(200).json({
      message: "Successfully added members",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getMembers = async (req, res, next) => {
  try {
    const result = await memberService.getMembers();

    res.status(200).json({
      message: "Successfully retrieved members",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {};
const remove = async (req, res, next) => {};

export default { create, update, remove, getMembers, createMany };
