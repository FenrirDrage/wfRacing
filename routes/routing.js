const express = require("express");
const router = express.Router();
const Dados = require("../models/schema");
const { addController, getController } = require('../controller/indexcont');

// Rota para adicionar dados ao banco de dados
router.post("/addData", addController.addData);

// Rota para buscar todos os dados do banco de dados
router.get("/getData", getController.getData);

module.exports = router;

