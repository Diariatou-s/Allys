const Admin = require('../models/admin');
const Rdv = require('../models/rendezvous');
const Service = require('../models/service');
const Patient = require('../models/patient');
const Facture = require('../models/facture');

module.exports.index = async (req, res) => {
    const userConnected = await Admin.findOne({identifiants: req.user});
    console.log(userConnected)
    res.render('administration/secretaire/index', { userConnected })
};

module.exports.consultationRdv = async (req, res) => {
    const user = await Admin.findOne({identifiants: req.user});
    const length = user.poste.length;
    const poste = user.poste.slice(24, length);
    const service = await Service.findOne({titre: poste})
    console.log(service)
    const rdvs = await Rdv.find({service: service});
    console.log(rdvs)
    res.render('administration/secretaire/cons_rdv', { rdvs, poste })
};

module.exports.nouveauRdv = async (req, res) => {
    const user = await Admin.findOne({identifiants: req.user});
    const length = user.poste.length;
    const poste = user.poste.slice(24, length);
    console.log(poste);
    res.render('administration/secretaire/nouv_rdv', { poste })
};

module.exports.creationRdv = async (req, res) => {
    const body = req.body.rdv;
    const d = new Date();
    var datecreation = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
    d.getFullYear() + " à " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    const service = await Service.findOne({titre: body.poste});
    const rdvDeDate = await Rdv.find({daterdv: body.daterdv});
    const length = rdvDeDate.length - 1;
    console.log(length)
    let num = 0
    if(length === -1){
        num = 1
    }else{
        num = rdvDeDate[length].num + 1
    }
    console.log(num)
    console.log(service);
    if(rdvDeDate){
        console.log("date")
        const rdv = new Rdv({
            num: num,
            datecreation: datecreation,
            daterdv: body.daterdv,
            prenom: body.prenom,
            nom: body.nom,
            service: service
        });
        await rdv.save();
        console.log(rdv)
    }else{
        const rdv = new Rdv({
            num: 1,
            datecreation: datecreation,
            daterdv: body.daterdv,
            prenom: body.prenom,
            nom: body.nom,
            service: service
        });
        await rdv.save();
        console.log(rdv)
    }
    req.flash('success', 'Rendez-vous ajouté');
    res.redirect('/sec')
};

module.exports.consultationDossiers = async (req, res) => {
    const user = await Admin.findOne({identifiants: req.user});
    const length = user.poste.length;
    const poste = user.poste.slice(24, length);
    const service = await Service.findOne({titre: poste});
    console.log(service)
    const patients = await Patient.find({'services': {$in: service}});
    console.log(patients)
    res.render('administration/secretaire/dossiers', { patients, poste })
};

module.exports.consultationPatient = async (req, res) => {
    const patient_ = await Patient.find({_id: req.params.id});
    const factures = await Facture.find({patient: patient_}).populate('service');
    console.log(factures)
    const patient = await Patient.findOne({_id: req.params.id});
    console.log(patient)
    res.render('administration/secretaire/patient', { patient, factures })
};
