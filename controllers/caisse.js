const Facture = require('../models/facture');
const Enc = require('../models/encaissement');
const Admin = require('../models/admin');

module.exports.historique = async(req, res) => {
    console.log(req.user)
    const caissier = await Admin.find({identifiants: req.user});
    const encs = await Enc.find({caissier: caissier}).populate('facture');
    console.log(encs)
    res.render('administration/caissier_e/historique', { encs })
};

module.exports.encaissement = async(req, res) => {
    const facture = await Facture.findById(req.params.id).populate('service').populate('facturier').populate('patient');
    console.log(facture)
    res.render('administration/caissier_e/encaissement', { facture })
};