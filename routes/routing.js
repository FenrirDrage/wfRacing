const express = require("express");
const router = express.Router();
const {
  addController,
  getController,
  editController,
  dropController,
  putController,
} = require("../controller/indexcont");

// Rota para adicionar dados ao banco de dados
router.post("/addData", addController.addData);

// Rota para buscar todos os dados do banco de dados
router.get("/getData", getController.getData);

// Rota para editar dados do banco de dados
router.post("/editData", editController.editData);

// Rota para apagar todos os dados do banco de dados
router.post("/dropData", dropController.dropData);

// Rota para atualizar todos os dados do banco de dados
router.post("/updateData/:id", putController.upData);

module.exports = router;
