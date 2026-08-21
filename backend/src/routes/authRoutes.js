import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import checkToken from "../middleware/checktoken.js";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/user", checkToken, getUser);
