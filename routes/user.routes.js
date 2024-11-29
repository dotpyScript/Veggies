const express = require("express");
const { ensureAuthenticated } = require("../middlewares/ensureAuth");
const router = express.Router();

router.get("/index", ensureAuthenticated, async (req, res) => {
  res.render("index", { title: "Admin Dashboard" });
});

module.exports = router;
