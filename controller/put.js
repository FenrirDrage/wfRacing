const Dados = require("../models/schema");

// Controlador para lidar com a atualização de dados
exports.upData = async (req, res) => {
  try {
    // Extraia os dados do corpo da requisição
    const { curva, hora, video, report, obs } = req.body;

    // Aqui você pode fazer validações dos dados, se necessário

    // Atualize os dados no banco de dados
    const dadosAtualizados = await Dados.findOneAndUpdate(
      { _id: req.params.id }, // Condição de pesquisa: substitua "id" pelo nome do parâmetro de rota
      { curva, hora, video, report, obs }, // Novos dados a serem atualizados
      { new: true } // Opção para retornar o documento atualizado
    );

    // Responda com os dados atualizados
    res.json(dadosAtualizados);
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
    res.status(500).json({ error: "Erro interno do servidor ao atualizar dados." });
  }
};