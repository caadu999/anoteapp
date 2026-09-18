import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const router = Router();

router.use(authMiddleware);

router.use("/", getUser);

export default router;
