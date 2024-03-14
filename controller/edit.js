const Dados = require("../models/schema");
const mongoose = require("mongoose");

exports.editData = async (req, res) => {
  try {
    const { id, curva, hora, video, report, obs } = req.body;

    // Corrigindo a criação do ObjectId
    const objectId = mongoose.Types.ObjectId(id);

    // Encontrar e atualizar o documento no banco de dados
    const result = await Dados.findOneAndUpdate(
      { _id: objectId },
      { curva, hora, video, report, obs },
      { new: true } // Para retornar o documento atualizado
    );

    res.json({ message: "Dados editados com sucesso.", data: result });
  } catch (error) {
    console.error("Erro ao editar dados:", error);
    res.status(500).json({ error: "Erro ao editar dados." });
  }
};
