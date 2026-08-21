import mongoose from "mongoose";

const { Schema } = mongoose;

const notaSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  favorite: { type: Boolean, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now },
  color: {
    type: String,
    default: "#ffffff",
  },
});

export const Nota = mongoose.model("Nota", notaSchema);
