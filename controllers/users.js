module.exports.login = (req, res) => {
    res.cookie('total', '0');
    res.render('user/login');
};

module.exports.authentication = async(req, res) => {
    req.flash('success', 'Bienvenue !');
    if(req.user.poste === 'medecin'){
        const redirectUrl = req.session.returnTo || '/medecin';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }else if(req.user.poste === 'facturier'){
        const redirectUrl = req.session.returnTo || '/fact';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }else if(req.user.poste === 'caissier'){
        const redirectUrl = req.session.returnTo || '/caisse';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }else if(req.user.poste === 'secretaire'){
        const redirectUrl = req.session.returnTo || '/sec';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }else {
        const redirectUrl = req.session.returnTo || '/accueil';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }
};

module.exports.logout = (req, res) => {
    req.logout();
    res.cookie('total', '0');
    req.flash('success', "Déconnecté avec succès!");
    res.redirect('/login');
  };