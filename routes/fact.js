const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacturier, validationFacture } = require("../middleware");
const fact = require("../controllers/fact");

router.get("/", isLoggedIn, isFacturier, fact.index);

router.get("/historique", isLoggedIn, isFacturier, catchAsync(fact.historique));

router
  .route("/nouv_fact")
  .get(isLoggedIn, isFacturier, catchAsync(fact.nouvelleFacture))
  .post(
    isLoggedIn,
    isFacturier,
    validationFacture,
    catchAsync(fact.creationfacture)
  );

router
  .route("/:id")
  .get(isLoggedIn, isFacturier, catchAsync(fact.affichageFacture))
  .put(isLoggedIn, isFacturier, catchAsync(fact.modificationFacture))
  .delete(isLoggedIn, isFacturier, catchAsync(fact.suppressionFacture));

router.get(
  "/:id/edit",
  isLoggedIn,
  isFacturier,
  catchAsync(fact.modifierFacture)
);

module.exports = router;
