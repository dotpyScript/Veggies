const bcrypt = require("bcryptjs");
const User = require("../models/user.models");
const { validationResult } = require("express-validator");

///////////  login Logic ///////////

// Get Request
const getLogin = async (req, res) => {
  res.render("login", { title: "login" });
};

// Post Request
const postLogin = async (req, res, next) => {
  const errors = validationResult(req);

  // Handle validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not exist" });
    }

    // Compare passwords
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Authenticate the user using Passport
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      // Respond with success
      res.json({
        success: true,
        message: "Login successful",
        redirect: "/index",
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//////// Register Logic ////////

// Get Requets
const getRegister = async (req, res) => {
  res.render("register");
};

// Post Request
const postRegister = async (req, res) => {
  const errors = validationResult(req);

  // Handle validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // Respond with success
    res.json({
      success: true,
      message: "Registration successfully",
      redirect: "/login",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Google Authentication Logic
// const getGoogleCallBack = (req, res) => {
//   res.status(200).json({
//     ok: true,
//     status: "success",
//     message: "Logged in successfully",
//     redirect: "/index?status=success",
//   });
// };

// Logout Logic
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  // getGoogleCallBack,
  logout,
};
