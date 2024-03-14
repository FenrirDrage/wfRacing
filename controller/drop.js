const mongoose = require("mongoose");
const Dados = require("../models/schema");

exports.dropData = async (req, res) => {
  try {
    // Excluir todos os documentos da coleção
    await Dados.deleteMany({});
    res.json({ message: "Todos os dados foram removidos com sucesso." });
  } catch (error) {
    console.error("Erro ao remover os dados:", error);
    res.status(500).json({ error: "Erro ao remover os dados." });
  }
};
