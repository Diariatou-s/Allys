const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EncSchema = new Schema({
  facture: {
    type: Schema.Types.ObjectId,
    ref: "Facture",
  },
  datedencaissement: String,
  montantdu: Number,
  montantrecu: Number,
  caissier: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Enc", EncSchema);
