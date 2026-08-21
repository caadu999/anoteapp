import express from "express";
import {
  createNotes,
  deleteNote,
  getNotes,
  getFavorite,
  toggleFavorite,
} from "../controllers/notes.controllers.js";
import checkToken from "../middleware/checktoken.js";

export const notesRouter = express.Router();

notesRouter.use(checkToken);

notesRouter.get("/", getNotes);
notesRouter.post("/", createNotes);
notesRouter.delete("/:id", deleteNote);
notesRouter.get("/favorites", getFavorite);
notesRouter.patch("/:id/favorites/toggle", toggleFavorite);
