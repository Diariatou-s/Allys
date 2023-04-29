const Medecin = require('../models/medecin');
const Predispo = require('../models/predispo');
const Excomp = require('../models/excomp');
const Symptome = require('../models/symptome');
const Branche = require('../models/branche');

module.exports.index = async (req, res) => {
    const userConnected = await Medecin.findOne({identifiants: req.user});
    console.log(userConnected)
    res.render('medecin/index', { userConnected });
};

module.exports.emploiDutemps = (req, res) => {
    res.render('medecin/edt');
};

module.exports.diagnostic = (req, res) => {
    res.render('medecin/diagnostic');
};

module.exports.nouvelleMaladie = async(req, res) => {
    const symptomes = await Symptome.find({});
    const excomps = await Excomp.find({});
    const predispos = await Predispo.find({});
    const branches = await Branche.find({});
    res.render('medecin/maladies', { symptomes, excomps, predispos, branches });
};

module.exports.nouvelleBranche = async(req, res) => {
    const symptomes = await Symptome.find({});
    res.render('medecin/branches', { symptomes });
};