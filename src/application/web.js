import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const web = express();
web.use(cors({ origin: "*" }));

web.use(express.json());
web.use(cookieParser());

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

export default web;
