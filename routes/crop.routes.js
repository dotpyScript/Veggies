const express = require("express");
const router = express.Router();
const { getCrops, postCrops } = require("../controllers/cropController");
const { ensureAuthenticated } = require("../middlewares/ensureAuth");

// Crops Routes
router.get("/add_crop", ensureAuthenticated, getCrops);

router.get("/crop_circle", ensureAuthenticated, async (req, res) => {
  res.render("crop_circle", { title: "Crop Circle" });
});

router.get("/harvest", ensureAuthenticated, async (req, res) => {
  res.render("harvest", { title: "harvest" });
});
router.get("/view_harvest", ensureAuthenticated, async (req, res) => {
  res.render("view_harvest", { title: "View Harvest" });
});
router.get("/livestock", ensureAuthenticated, async (req, res) => {
  res.render("livestock", { title: "Livestock" });
});
router.get("/view_livestock", ensureAuthenticated, async (req, res) => {
  res.render("view_livestock", { title: "View Livestock" });
});
router.get("/set_schedule", ensureAuthenticated, async (req, res) => {
  res.render("set_schedule", { title: "Set Schedule" });
});
router.get("/view_schedule", ensureAuthenticated, async (req, res) => {
  res.render("view_schedule", { title: "View Schedule" });
});

module.exports = router;
