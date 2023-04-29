const mongoose = require("mongoose");
const {
  prenoms,
  noms,
  postes,
  services,
  prix,
  symptomes,
  excomps,
  predispos
} = require("./infos.js");
const Medecin = require("../models/medecin");
const Admin = require("../models/admin");
const User = require("../models/user");
const Service = require("../models/service");
const Symptome = require("../models/symptome");
const Predispo = require("../models/predispo");
const Excomp = require("../models/excomp");
const rand = require("../utils/randomString");

mongoose.connect("mongodb://localhost:27017/allys");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Medecin.deleteMany({});
  await Admin.deleteMany({});
  await User.deleteMany({});
  await Service.deleteMany({});
  await Symptome.deleteMany({});
  await Excomp.deleteMany({});
  await Predispo.deleteMany({});
  for (let i = 0; i < 5; i++) {
    const rand5 = rand(5);
    let prenom = `${sample(prenoms)}`;
    let nom = `${sample(noms)}`;
    let email = `${prenom.replace(/ /g, "").toLowerCase()}.${nom
      .replace(/ /g, "")
      .toLowerCase()}${i}@allys.com`;
    let password = `${prenom.replace(/ /g, "").toLowerCase()}_${nom
      .replace(/ /g, "")
      .toLowerCase()}${i}`;
    console.log(password);
    let username = `${prenom}_${nom}_${rand5}`;
    const poste = "medecin";
    const user = new User({ email, poste, username });
    const registeredUser = await User.register(user, password);
    const medecin = new Medecin({
      prenom: prenom,
      nom: nom,
      service: `${sample(services)}`,
      date_insc: "12-04-2022",
      identifiants: registeredUser,
    });
    await medecin.save();
  }
  for (let i = 0; i < 50; i++) {
    const rand5 = rand(5);
    let prenom = `${sample(prenoms)}`;
    let nom = `${sample(noms)}`;
    let service = `${sample(services)}`;
    let email = `${prenom.replace(/ /g, "").toLowerCase()}.${nom
      .replace(/ /g, "")
      .toLowerCase()}${i}@allys.com`;
    let password = `${prenom.replace(/ /g, "").toLowerCase()}_${nom
      .replace(/ /g, "")
      .toLowerCase()}${i}`;
      console.log(password)
    let username = `${prenom}_${nom}_${rand5}`;
    let poste_ = `${sample(postes)}`;
    let poste = "";
    if (poste_ === "Facturier(e)") {
      console.log("facturier");
      poste = "facturier";
    } else if (poste_ === "Caissier(e)") {
      console.log("caissier");
      poste = "caissier";
    } else if (poste_ === "Secrétaire d\'accueil") {
      console.log("accueil");
      poste = "accueil";
    } else {
      console.log("secretaire");
      poste_ = `Secrétaire de Service / ${service}`;
      poste = "secretaire";
    }
    const user = new User({ email, poste, username });
    const registeredUser = await User.register(user, password);
    const admin = new Admin({
      prenom: prenom,
      nom: nom,
      poste: poste_,
      date_insc: "12-04-2022",
      identifiants: registeredUser,
    });
    await admin.save();
  }
  for(let i = 0; i < services.length; i++){
    let prix_ = `${sample(prix)}`;
    let prix__ = parseInt(prix_);
    const service = new Service({
      titre: services[i],
      montant: prix__
    });
    await service.save();
  }
  for(let i = 0; i < symptomes.length; i++){
    const symptome = new Symptome({
      nom: symptomes[i]
    });
    await symptome.save();
  }
  for(let i = 0; i < excomps.length; i++){
    const excomp = new Excomp({
      nom: excomps[i]
    });
    await excomp.save();
  }
  for(let i = 0; i < predispos.length; i++){
    const predispo = new Predispo({
      nom: predispos[i]
    });
    await predispo.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
