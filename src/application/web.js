import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";
import cookieParser from "cookie-parser";

export const web = express();
web.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

web.use(express.json());
web.use(cookieParser());

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
