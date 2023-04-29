const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    titre: String,
    montant: Number
})

module.exports = mongoose.model("Service", ServiceSchema);