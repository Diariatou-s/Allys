const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    numdossier: String,
    dateinsc: String,
    prenom: String,
    nom: String,
    cni: Number,
    adresse: String,
    telephone: String,
    datenaiss: String,
    lieunaiss: String,
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: "Service"
        }
    ]
});


module.exports = mongoose.model("Patient", PatientSchema);