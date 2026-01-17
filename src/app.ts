import express, { json } from "express";
import dotenv from "dotenv";
import { allowCors } from "./middlewares/cors";
import cookieParser from "cookie-parser";

import authRouter from "./features/auth/auth.controller";
import userRouter from "./features/user/user.controller";
import postRouter from "./features/post/post.controller";

import { errorHandler } from "./middlewares/error";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(allowCors);
app.use(json());
app.use(cookieParser());
app.use("/images", express.static("../public/images"));

app.use("/api", authRouter, userRouter, postRouter);

// Global error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
