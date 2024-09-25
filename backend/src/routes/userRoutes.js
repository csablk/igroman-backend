import { Router } from "express";
import { getProfile } from "../controllers/user/get-profile.controller.js";
import checkAuthMiddleware from "../middlewares/check-auth.middleware.js";

const userRouter = Router();

userRouter.get("/get-profile", checkAuthMiddleware, getProfile);

export default userRouter;
