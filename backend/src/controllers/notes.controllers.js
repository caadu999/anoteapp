import { Nota } from "../models/notes.js";

// ---------------- CARREGAR NOTAS ------------------

export async function getNotes(req, res) {
  try {
    const notes = await Nota.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ----------------- CRIAR -----------------

export async function createNotes(req, res) {
  const { title, description, color } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "título e conteúdo são obrigatórios" });
  }

  if (title.length > 40) {
    return res
      .status(400)
      .json({ error: "título não deve ter mais que 0 caracteres" });
  }

  try {
    const note = await Nota.create({
      title,
      description,
      userId: req.user.id,
      color,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ----------------- DELETAR --------------------

export const deleteNote = async (req, res) => {
  try {
    console.log("ID DA NOTA:", req.params.id);
    console.log("USER DO TOKEN:", req.user.id);

    const noteById = await Nota.findById(req.params.id);

    console.log("NOTA PELO ID:", noteById);

    const note = await Nota.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    console.log("NOTE:", note);

    if (!note) {
      return res.status(404).json({ error: "nota não encontrada" });
    }

    res.json({ message: "nota deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ----------------- PEGAR FAVORITO --------------------

export const getFavorite = async (req, res) => {
  try {
    const favorite = await Nota.find({ favorite: true, userId: req.user.id });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------- TOGGLE FAVORITO --------------------

export const toggleFavorite = async (req, res) => {
  try {
    const note = await Nota.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    note.favorite = !note.favorite;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
