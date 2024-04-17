import jwt from "jsonwebtoken";
import { logger } from "../application/logging.js";
import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    res.status(200).json({
      message: "Successfully registered",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days

    // GENERATE TOKEN
    const token = jwt.sign(
      { id: result.id, ...(req.groupId && { groupId: result.groupId }) },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    res
      .cookie("usertoken", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({
        message: "Successfully logged in",
        data: result,
      });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await userService.update(id, body);

    res.status(200).json({
      message: "User updated successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("usertoken").status(200).json({
      message: "Successfully logged out",
    });
  } catch (e) {
    next(e);
  }
};

const users = async (req, res, next) => {
  try {
    const result = await userService.users();

    res.status(200).json({
      message: "Users",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const user = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.user(userId);

    res.status(200).json({
      message: "Successfully retrieved user data",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  logout,
  update,
  users,
  user,
};
