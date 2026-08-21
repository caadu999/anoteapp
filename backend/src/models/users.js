import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "O nome é obrigatório"],
    trim: true,
    minlength: [2, "O nome deve ter pelo menos 2 caracteres"],
    maxlength: [20, "O nome não pode exceder 20 caracteres"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "E-mail inválido"],
  },
  date: { type: Date, default: Date.now },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const User = mongoose.model("User", userSchema);
