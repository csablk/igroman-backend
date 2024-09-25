import { Router } from "express";
import { login } from "../controllers/auth/login.controller.js";
import { register } from "../controllers/auth/register.controller.js";
import { registerValidation } from "../validations/register.validation.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, register);
authRouter.post("/login", login);

export default authRouter;
