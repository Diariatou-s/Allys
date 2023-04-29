const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PredispoSchema = new Schema({
    nom: String
});

module.exports = mongoose.model("Predispo", PredispoSchema);