const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactureSchema = new Schema({
  num: String,
  datecreation: String,
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  imputation: Boolean,
  pourcentage: String,
  autres: String,
  montantdu: Number,
  enc: Boolean,
  facturier: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  }
});

module.exports = mongoose.model("Facture", FactureSchema);
