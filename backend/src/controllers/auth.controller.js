import { prisma } from "../config/database.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({ error: "User já existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: req.body.name,
          email: req.body.email,
        },
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(400).json({ error: "Dados invalidos" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Dados invalidos" });
    }

    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: req.body.email,
        },
        token,
      },
    });
  } catch (error) {}
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({
    status: "success",
    message: "Deslogado com sucesso",
  });
};

export { register, login, logout };