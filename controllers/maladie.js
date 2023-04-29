const Maladie = require('../models/maladie');
const Predispo = require('../models/predispo');
const Excomp = require('../models/excomp');
const Symptome = require('../models/symptome');
const Branche = require('../models/branche');

module.exports.creationMaladie = async(req, res) => {
    const body = req.body.maladie;
    const nom = body.nom
    const symptomes = body.symptomes;
    console.log(symptomes);
    console.log(symptomes.length);
    const predispos = body.predispos;
    const excomps = body.excomps;
    const branches = body.branches;
    const maladie = new Maladie({
        nom: nom
    });
    if (symptomes !== undefined){
        if(symptomes[0] === '6'){
            const symptome = await Symptome.findById(symptomes);
            maladie.symptomes.push(symptome)
        }else {
            for (let i = 0; i < symptomes.length; i++){
                const symptome = await Symptome.findById(symptomes[i]);
                maladie.symptomes.push(symptome)
        }
    }}
    if(excomps !== undefined){
        if (excomps[0] === '6'){
            const excomp = await Excomp.findById(excomps);
            maladie.excomps.push(excomp);
        }else{
            for (let i = 0; i < excomps.length; i++){
                const excomp = await Excomp.findById(excomps[i]);
                maladie.excomps.push(excomp);
        }
    }}
    if (predispos !== undefined){
        if(predispos[0] === '6'){
            const predispo = await Predispo.findById(predispos);
            maladie.predispos.push(predispo);
        }else {
            for (let i = 0; i < predispos.length; i++){
                const predispo = await Predispo.findById(predispos[i]);
                maladie.predispos.push(predispo);
        }
    }}
    if(branches !== undefined){
        if (branches[0] === '6'){
            const branche = await Branche.findById(branches);
            maladie.branches.push(branche);
        }else {
            for (let i = 0; i < branches.length; i++){
                const branche = await Branche.findById(branches[i]);
                maladie.branches.push(branche);
            }}
        }
    
    await maladie.save();
    req.flash('success', 'Success');
    res.redirect('/medecin')
};