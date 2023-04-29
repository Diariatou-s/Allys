const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExcompSchema = new Schema({
    nom: String
});

module.exports = mongoose.model("Excomp", ExcompSchema);