// exports.getCrops = (req, res) => {
//   // Logic to fetch crops from database
//   res.render("crop_circle", { crops: [], title: crops });
// };

// exports.addCrop = (req, res) => {
//   // Logic to add a new crop
//   const { cropName, cropType } = req.body;
//   console.log(`Adding crop: ${cropName} (${cropType})`);
//   res.redirect("/crops");
// };

///////////// Crops Logic ///////////////

// Get Request
const getCrops = async (req, res) => {
  res.render("add_crop", { title: "Add Crops" });
};

// Post Request

const postCrops = async (req, res) => {
  const errors = validationResult(req);

  // Handle validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firs } = req.body;
};

module.exports = { getCrops, postCrops };
