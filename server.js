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
} = require("./controller/indexcont");
const daily_expenses_model = require("moongose/models/daily_expenses_model");

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

//use routing
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
