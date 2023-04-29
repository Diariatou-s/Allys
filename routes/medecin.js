const express = require('express');
const router = express.Router();
const { isLoggedIn, isMedecin } = require('../middleware');
const medecin = require('../controllers/medecin');
const catchAsync = require('../utils/catchAsync');

router.get('/', isLoggedIn, isMedecin, catchAsync(medecin.index));

router.get('/edt', isLoggedIn, isMedecin, medecin.emploiDutemps);

router.get('/diagnostic', isLoggedIn, isMedecin, medecin.diagnostic);

router.get('/maladie', isLoggedIn, isMedecin, medecin.nouvelleMaladie);

router.get('/branche', isLoggedIn, isMedecin, medecin.nouvelleBranche);

module.exports = router;