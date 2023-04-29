const Facture = require('../models/facture');
const Service = require('../models/service');
const Admin = require('../models/admin');
const Enc = require('../models/encaissement');
const Patient = require('../models/patient');
const rand = require('../utils/randomString');

module.exports.index = async (req, res) => {
    console.log(req.user)
    const userConnected = await Admin.findOne({identifiants: req.user});
    console.log(userConnected)
    res.render('administration/facturier_e/index', { userConnected })
};

module.exports.nouvelleFacture = async(req, res) => {
    const services = await Service.find({});
    console.log(services);
    res.render('administration/facturier_e/nouveau', { services })
};

module.exports.historique = async(req, res) => {
    const userConnected = await Admin.find({identifiants: req.user});
    const factures = await Facture.find({facturier: userConnected}).populate('patient').populate('service');
    res.render('administration/facturier_e/historique', { factures })
};

module.exports.creationfacture = async(req, res) => {
    const body = req.body.facture;
    console.log(body.patient.datenaiss)
    const idService = body.service;
    console.log(idService);
    const pourcentage = `${body.pourcentage}%`;
    const reduc = body.pourcentage/100;
    const d = new Date();
    var datecreation = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
    d.getFullYear() + " à " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    const service = await Service.findById(idService);
    const facturier = await Admin.findOne({identifiants: req.user});
    console.log(service.titre);
    console.log(service);
    const montantDu = service.montant - (service.montant*reduc);
    let autres = "";
    if(body.autres !== " "){
        autres = body.autres
    }else{
        autres = "Néant"
    };
    console
    console.log(montantDu)
    const patientFound = await Patient.findOne({cni: body.patient.cni});
    console.log(patientFound)
    if(!patientFound){
        console.log('pas trouvé')
        const newPatient = new Patient({
            numdossier: rand(15),
            dateinsc: datecreation,
            prenom: body.patient.prenom,
            nom: body.patient.nom,
            cni: body.patient.cni,
            adresse: body.patient.adresse,
            telephone: body.patient.telephone,
            datenaiss: body.patient.datenaiss,
            lieunaiss: body.patient.lieunaiss
        });
        newPatient.services.push(service)
        await newPatient.save();
        const facture = new Facture({
            num: rand(10),
            datecreation: datecreation,
            patient: newPatient,
            service: service,
            facturier: facturier,
            imputation: body.imputation,
            pourcentage: pourcentage,
            autres: autres,
            montantdu: montantDu,
            enc: false,
        });
        await facture.save();
    }else{
        console.log('trouvé')
        const facture = new Facture({
            num: rand(10),
            datecreation: datecreation,
            patient: patientFound,
            service: service,
            facturier: facturier,
            imputation: body.imputation,
            autres: autres,
            montantdu: montantDu,
            enc: false,
        });
        patientFound.services.push(service);
        await patientFound.save();
        await facture.save();
    }
    req.flash('success', 'Facture ajoutée');
    res.redirect('/fact')
};

module.exports.affichageFacture = async (req, res) => {
    const facture = await Facture.findOne({_id: req.params.id}).populate('patient').populate('service');
    console.log(facture)
    res.render('administration/facturier_e/facture', { facture });
};

module.exports.modifierFacture = async (req, res) => {
    const fact = await Facture.findOne({_id: req.params.id}).populate('patient').populate('service');
    console.log(fact.pourcentage)
    const pourcentage_ = fact.pourcentage;
    const pourcentage = pourcentage_.replace('%', '');
    console.log(pourcentage)
    const services = await Service.find({});
    if (!fact) {
        req.flash('error', 'Cette facture n\'existe pas !');
        return res.redirect('/fact');
    }
    res.render('administration/facturier_e/modification', { fact, pourcentage, services });
};

module.exports.modificationFacture = async(req, res) => {
    console.log('entré dans la fonction')
    const body = req.body.facture;
    console.log(req.body);
    const idService = body.service;
    let pourcentage_= body.pourcentage;
    console.log(body.imputation)
    if(body.imputation === 'false'){
        console.log('non')
        pourcentage_ = '0';
    }
    console.log(pourcentage_)
    const pourcentage = `${pourcentage_}%`;
    const reduc = pourcentage_/100;
    const facture = await Facture.findOne({_id: req.params.id}).populate('patient');
    console.log(facture)
    const patient = await Patient.findOne({cni: facture.patient.cni});
    console.log(patient)
    const service = await Service.findById(idService);
    const montantDu = service.montant - (service.montant*reduc);
    patient.prenom = body.patient.prenom;
    patient.nom = body.patient.nom;
    patient.cni = body.patient.cni;
    patient.adresse = body.patient.adresse;
    patient.telephone = body.patient.telephone;
    patient.datenaiss = body.patient.datenaiss;
    patient.lieunaiss = body.patient.lieunaiss;
    await patient.save();
    console.log(patient);
    facture.patient = patient,
    facture.service = service,
    facture.imputation = body.imputation,
    facture.pourcentage = pourcentage,
    facture.autres = body.autres,
    facture.montantdu = montantDu,
    facture.enc = false,
    await facture.save();
    req.flash('success', 'Facture modifiée');
    res.redirect('/fact/historique')
}

module.exports.suppressionFacture = async(req, res) => {
    const { id } = req.params;
    const facture = await Facture.findById(id);
    console.log(facture)
    const enc = await Enc.findOne({facture: facture});
    console.log(enc)
    await Facture.findByIdAndDelete(id);
    if(enc){
        await Enc.findByIdAndDelete(enc._id);
    }
    req.flash('success', 'Facture supprimée')
    res.redirect('/fact/historique');
}