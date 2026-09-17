import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import cardSchema from "../validators/cardValidator.js";
import {
  getCards,
  createCard,
  getFavoriteCards,
  toggleFavorite,
  updateCard,
  deleteCard,
} from "../controllers/card.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getCards);
router.post("/", validateRequest(cardSchema), createCard);
router.patch("/:cardId", updateCard);
router.delete("/:cardId", deleteCard);
router.get("/favorites", getFavoriteCards);
router.patch("/:cardId/favorite", toggleFavorite);

export default router;