import { Router } from "express";
import authRouter from "./auth.routes.js";
import cardRouter from "./card.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/cards", cardRouter);

export default router;
