const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaladieSchema = new Schema({
    nom: String,
    branches: [
        {
        type: Schema.Types.ObjectId,
        ref: "Branche",
        }
    ],
    symptomes: [
        {
        type: Schema.Types.ObjectId,
        ref: "Symptome",
        }
    ],
    predispos: [
        {
        type: Schema.Types.ObjectId,
        ref: "Predispo",
        }
    ],
    excomps: [
        {
        type: Schema.Types.ObjectId,
        ref: "Excomp",
        }
    ]
});

module.exports = mongoose.model("Maladie", MaladieSchema);