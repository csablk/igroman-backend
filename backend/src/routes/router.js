import { Router } from "express";
import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import adminRouter from "./adminRoutes.js";
import productRouter from "./productRoutes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/product", productRouter);

export default router;
