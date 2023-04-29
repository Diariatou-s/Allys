const express = require("express");
const router = express.Router();
const { isLoggedIn, isSecretaire } = require("../middleware");
const secretaire = require("../controllers/secretaire");
const catchAsync = require("../utils/catchAsync");

router.get("/", isLoggedIn, isSecretaire, catchAsync(secretaire.index));

router.get(
  "/cons_rdv",
  isLoggedIn,
  isSecretaire,
  catchAsync(secretaire.consultationRdv)
);

router
  .route("/nouv_rdv")
  .get(isLoggedIn, isSecretaire, catchAsync(secretaire.nouveauRdv))
  .post(isLoggedIn, isSecretaire, catchAsync(secretaire.creationRdv));

router.get(
  "/dossiers",
  isLoggedIn,
  isSecretaire,
  catchAsync(secretaire.consultationDossiers)
);

router.get(
    "/:id",
    isLoggedIn,
    isSecretaire,
    catchAsync(secretaire.consultationPatient)
  );

module.exports = router;
