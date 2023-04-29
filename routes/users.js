const express = require("express");
const router = express.Router();
const passport = require("passport");
const cookieParser= require('cookie-parser');
const users = require("../controllers/users");

router.use(cookieParser());

router
  .route("/login")
  .get(users.login)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.authentication
  );

router.get("/logout", users.logout);

module.exports = router;
