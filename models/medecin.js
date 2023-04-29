const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedecinSchema = new Schema({
  prenom: String,
  nom: String,
  service: String,
  date_insc: String,
  identifiants: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Medecin", MedecinSchema);
