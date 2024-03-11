const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect("mongodb://localhost:27017/testedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir modelo Mongoose para os dados
const Dado = mongoose.model("jafoi", {
  curva: String,
  hora: String,
  video: Boolean,
  report: Boolean,
  obs: String,
});

// Middleware para análise de dados JSON
app.use(bodyParser.json());

// Rota para adicionar dados ao banco de dados
app.post("/addData", async (req, res) => {
  try {
    const { curva, hora, video, report, obs } = req.body;

    // Criar um novo objeto de dados com os dados recebidos
    const novoDado = new Dado({
      curva,
      hora,
      video,
      report,
      obs,
    });

    // Salvar o novo dado no banco de dados
    await novoDado.save();

    res.json({ message: "Dados adicionados com sucesso." });
  } catch (error) {
    console.error("Erro ao adicionar dados:", error);
    res.status(500).json({ error: "Erro ao adicionar dados." });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
