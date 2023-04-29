const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrancheSchema = new Schema({
    nom: String,
    symptomes: [
        {
        type: Schema.Types.ObjectId,
        ref: "Symptome",
        }
    ]
});

module.exports = mongoose.model("Branche", BrancheSchema);