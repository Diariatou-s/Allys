const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    prenom: String,
    nom: String,
    poste: String,
    date_insc: String,
    identifiants: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Admin", AdminSchema);