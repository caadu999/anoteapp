import express from "express";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/AUTH.controllers.js";
import checkToken from "../middleware/checktoken.js";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/user", checkToken, getUser);
