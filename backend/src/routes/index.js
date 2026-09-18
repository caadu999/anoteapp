import { Router } from "express";
import authRouter from "./auth.routes.js";
import cardRouter from "./card.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/cards", cardRouter);
router.use("/user", userRouter);

export default router;
