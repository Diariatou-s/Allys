const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SymptomeSchema = new Schema({
    nom: String
});

module.exports = mongoose.model("Symptome", SymptomeSchema);