const Branche = require('../models/branche');
const Symptome = require('../models/symptome');

module.exports.creationBranche = async(req, res) => {
    const body = req.body.branche;
    const nom = body.nom
    const symptomes = body.symptomes;
    //console.log(symptomes);
    //console.log(symptomes.length);
    const branche = new Branche({
        nom: nom
    });
    // for (let i = 0; i < symptomes.length; i++){
    //     const symptome = await Symptome.findById(symptomes[i]);
    //     branche.symptomes.push(symptome)
    // }
    await branche.save();
    req.flash('success', 'Success');
    res.redirect('/medecin')
};