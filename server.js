//utilizações require
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/routing");
const {
  addController,
  getController,
  editController,
  putController,
} = require("./controller/indexcont");

const app = express();
const port = process.env.PORT || 3000;

//iniciar cors
app.use(
  cors({
    origin: "*",
  })
);

// Conectar ao MongoDB
mongoose.connect("mongodb://localhost:27017/local", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware para análise de dados JSON
app.use(bodyParser.json());

app.post("/addData", addController.addData);
app.get("/getData", getController.getData);
app.post("/editData", editController.editData);
app.put("/upData",putController.upData);

//use routing
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
