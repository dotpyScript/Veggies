const express = require("express");
const { ensureGuest } = require("../middlewares/ensureAuth");
const {
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
} = require("../middlewares/googleAuth");
const {
  loginValidation,
  registerValidation,
} = require("../middlewares/validation");
const {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getGoogleCallBack,
  logout,
} = require("../controllers/authController");

const router = express.Router();

// Login Routes
router.get("/login", ensureGuest, getLogin);
router.post("/login", loginValidation, postLogin);

// Registration Routes
router.get("/register", ensureGuest, getRegister);
router.post("/register", registerValidation, postRegister);

// Google Authentication Routes
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback, getGoogleCallBack);

// facebook Authentication Routes
router.get("/auth/facebook", facebookAuth);
router.get("/facebook/callback", facebookCallback);

// Logout Route
router.get("/logout", logout);

module.exports = router;
