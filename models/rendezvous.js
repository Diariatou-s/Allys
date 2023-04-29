const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RdvSchema = new Schema({
  num: Number,
  datecreation: String,
  daterdv: String,
  prenom: String,
  nom: String,
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  }
});

module.exports = mongoose.model("Rdv", RdvSchema);
