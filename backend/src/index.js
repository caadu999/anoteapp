import express from "express";
import { notesRouter } from "./routes/notes.routes.js";
import dotenv from "dotenv";
import connectDB from "./server/database.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
