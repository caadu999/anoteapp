import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import authSchema from "../validators/authValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

router.post("/register", validateRequest(authSchema), register);
router.post("/login", login);
router.post("/logout", logout);

export default router;