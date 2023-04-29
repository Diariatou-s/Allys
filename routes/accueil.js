const express = require('express');
const router = express.Router();
const { isLoggedIn, isAccueil } = require('../middleware');
const accueil = require('../controllers/accueil');
const catchAsync = require('../utils/catchAsync');

router.get('/', isLoggedIn, isAccueil, catchAsync(accueil.index));

router.get('/cons_rdv', isLoggedIn, isAccueil, catchAsync(accueil.consultationRdv));

router.get('/:id', isLoggedIn, isAccueil, catchAsync(accueil.rdv));

module.exports = router;