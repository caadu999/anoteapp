import { prisma } from "../config/database.js";


export const getCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const cards = await prisma.card.findMany({
      where: {
        userId,
        favorite: false,
      },
    });
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ message: `Erro ao buscar cards: ${error}` });
  }
};

export const getFavoriteCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const cards = await prisma.card.findMany({
      where: {
        userId,
        favorite: true,
      },
    });
    return res.status(200).json(cards);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Erro ao buscar cards favoritos: ${error}` });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const cardId = Number(req.params.cardId);
    const userId = req.user.id;
    const card = await prisma.card.findFirst({
      where: {
        cardId,
        userId,
      },
    });

    if (!card) {
      return res.status(404).json({ error: "Card nao encontrado" });
    }

    const updatedCard = await prisma.card.update({
      where: {
        cardId,
      },
      data: {
        favorite: !card.favorite,
      },
    });

    return res.status(200).json(updatedCard);
  } catch (error) {
    return res.status(500).json({ error: `Erro ao atualizar card: ${error}` });
  }
};

export const createCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, color, favorite } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "título e descrição são obrigatórios" });
    }

    const card = await prisma.card.create({
      data: {
        title,
        description,
        color,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json(card);
  } catch (error) {
    res.json(500).json({ error: `Erro ao criar card: ${error}` });
  }
};

export const updateCard = async (req, res) => {
  try {
    const cardId = Number(req.params.cardId);
    const userId = req.user.id;

    const card = await prisma.card.findFirst({
      where: {
        cardId,
        userId,
      },
    });

    if (!card) {
      return res.status(404).json({ error: "Card nao encontrado" });
    }

    const updatedCard = await prisma.card.update({
      where: {
        cardId,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        color: req.body.color,
      },
    });

    return res.status(200).json(updatedCard);
  } catch (error) {
    return res.status(500).json({ error: `Erro ao atualizar card: ${error}` });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const cardId = Number(req.params.cardId);
    const userId = req.user.id;

    const card = await prisma.card.findFirst({
      where: {
        cardId,
        userId,
      },
    });

    if (!card) {
      return res.status(404).json({ error: "Card nao encontrado" });
    }

    await prisma.card.delete({
      where: {
        cardId,
      },
    });

    return res.status(200).json({
      message: "Card deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({ error: `Erro ao deletar card: ${error}` });
  }
};