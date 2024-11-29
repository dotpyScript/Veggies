const passport = require("passport");

// Google Athentication middleware
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});
const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login?status=failure",
});

// Facebook Authentication Middleware
const facebookAuth = passport.authenticate("facebook", {
  scope: ["email"],
});

const facebookCallback = passport.authenticate("facebook", {
  successRedirect: "/index",
  failureRedirect: "/login",
});

module.exports = { googleAuth, googleCallback, facebookAuth, facebookCallback };
