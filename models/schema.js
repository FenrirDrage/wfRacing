const mongoose = require("mongoose");

// Definir modelo Mongoose para os dados
const dadoSchema = new mongoose.Schema(
    {
        curva:{
            type: String,
        },
        hora:{
            type: String,
        },
        video: {
            type: Boolean,
        },
        report: {
            type: Boolean,
        },
        obs:{
            type: String,
        },
    }
);

const Dados = mongoose.model("wfr", dadoSchema, "wfrs");

module.exports = Dados;