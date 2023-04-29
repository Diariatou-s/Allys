const { factureSchema } = require('./schemas');

const ExpressError = require('./utils/ExpressError');

module.exports.validationFacture = (req, res, next) => {
    const { error } = factureSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Connectez-vous d\'abord');
        return res.redirect('/login');
    }
    next();
}

module.exports.isMedecin = (req, res, next) => {
    if(req.user.poste !== 'medecin'){
        req.flash('error', 'Vous n\'avez pas accès à cette page !');
        return res.redirect('/login');
    }else{
        next()
    }
};

module.exports.isFacturier = (req, res, next) => {
    console.log(req.originalUrl)
    if(req.user.poste !== 'facturier'){
        req.flash('error', 'Vous n\'avez pas accès à cette page !');
        return res.redirect('/login');
    }else{
        next()
    }
};

module.exports.isCaissier = (req, res, next) => {
    console.log(req.originalUrl)
    if(req.user.poste !== 'caissier'){
        req.flash('error', 'Vous n\'avez pas accès à cette page !');
        return res.redirect('/login');
    }else{
        next()
    }
};

module.exports.isSecretaire = (req, res, next) => {
    console.log(req.originalUrl)
    if(req.user.poste !== 'secretaire'){
        req.flash('error', 'Vous n\'avez pas accès à cette page !');
        return res.redirect('/login');
    }else{
        next()
    }
};

module.exports.isAccueil = (req, res, next) => {
    console.log(req.originalUrl)
    if(req.user.poste !== 'accueil'){
        req.flash('error', 'Vous n\'avez pas accès à cette page !');
        return res.redirect('/login');
    }else{
        next()
    }
};