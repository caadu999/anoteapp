import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import checkToken from "../middleware/checktoken.js";

export const userRouter = express.Router();

userRouter.get("/", checkToken, async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

userRouter.put("/", checkToken, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  res.json(user);
});
