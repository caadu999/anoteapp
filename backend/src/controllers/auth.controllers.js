import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ------------- REGISTRO ------------------

export async function registerUser(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //checar pelos campos
  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: "por favor, preencha todos os campos" });
  }
  //checar se a senha combina

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "as senhas não conferem" });
  }

  //ve se o user existe

  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      error: null,
      msg: "você realizou o cadastro com sucesso",
      token: token,
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

// ------------- LOGIN -------------

export async function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return res.status(400).json({ error: "Email não encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ error: "Senha Incorreta" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.json({
    error: null,
    msg: "Você realizou o login com sucesso",
    token: token,
    userId: user._id,
  });
}

// ------------ GET USER --------------

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário nao encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
