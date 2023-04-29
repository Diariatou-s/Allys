const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isCaissier } = require('../middleware');
const caisse = require('../controllers/caisse');
const Facture = require('../models/facture');
const Admin = require('../models/admin');
const Enc = require('../models/encaissement');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/', isLoggedIn, isCaissier, catchAsync(async(req, res) => {
    const userConnected = await Admin.findOne({identifiants: req.user});
    console.log(userConnected)
    const factures = await Facture.find({ enc: false }).populate('facturier').populate('service').populate('patient');
    console.log(factures)
    const { total = 0 } = req.cookies;
    res.render('administration/caissier_e/index', { factures, total, userConnected })
}));

router.get('/historique', isLoggedIn, isCaissier, catchAsync(caisse.historique))

router.get('/:id', isLoggedIn, isCaissier, catchAsync(caisse.encaissement));

router.post('/:id', isLoggedIn, isCaissier, catchAsync(async(req, res) => {
    const body = req.body.encaissement;
    const caissier = await Admin.findOne({ identifiants: req.user });
    const facture = await Facture.findById(req.params.id).populate('service');
    const d = new Date();
    var datecreation = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " à " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    if (facture.enc) {
        req.flash('error', 'Facture déjà encaissée')
        res.redirect('/caisse')
    }
    facture.enc = true;
    const { total } = req.cookies;
    let somme = parseInt(total) + facture.montantdu;
    res.cookie('total', `${somme}`);
    facture.save();
    const enc = new Enc({
        facture: facture,
        datedencaissement: datecreation,
        montantdu: facture.montantdu,
        montantrecu: body.montant,
        caissier: caissier
    })
    console.log(enc)
    await enc.save();
    req.flash('success', 'Facture encaissée avec succès')
    res.redirect('/caisse')
}));

module.exports = router;