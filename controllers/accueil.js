const Admin = require('../models/admin');
const Service = require('../models/service');
const Rdv = require('../models/rendezvous');

module.exports.index = async (req, res) => {
    const userConnected = await Admin.findOne({identifiants: req.user});
    const services = await Service.find({});
    res.render('administration/accueil/index', { userConnected, services })
};

module.exports.consultationRdv = async (req, res) => {
    const services = await Service.find({});
    console.log(services)
    res.render('administration/accueil/cons_rdv', { services })
};

module.exports.rdv = async (req, res) => {
    const service = await Service.findOne({_id: req.params.id});
    const rdvs = await Rdv.find({service: service});
    res.render('administration/accueil/rdv', { service, rdvs })
};