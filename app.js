// require("dotenv-safe").config();
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
// const rateLimit = require("express-rate-limit");
const path = require("path");
const passport = require("passport"); // Add passport

// User defined Import
const connectDB = require("./config/db");

// Passport Configuration (Add this)
require("./config/passport")(passport);

const requiredEnvs = ["MONGODB_URI", "SESSION_SECRET"];
requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.error(`Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

// Create Express app
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xssClean());

// // Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 300, // limit each IP to 300 requests per windowMs
// });
// app.use(limiter);

// Compression
app.use(compression());

// Logging
app.use(morgan("combined"));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware (Updated)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_default_secret",
    resave: false,
    saveUninitialized: false, // Changed to false for passport
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport Middleware (Add these lines)
app.use(passport.initialize());
app.use(passport.session());

// View Engine Setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Database Connection
connectDB();

// Routes
app.use("/", require("./routes/user.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/crop.routes")); // Crop management routes
// app.use("/", require("./routes/schedule.routes")); // Schedule routes
// app.use("/", require("./routes/livestock.routes")); // Livestock management routes

// Social Authentication Routes (Add this)
// app.use("/", require("./routes/social.auth.routes"));

// Error Handling Middleware
app.use(require("./middlewares/errorHandler"));

// Port Configuration
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} on URL: https://127.0.0.1:3000/login`
  );
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});

module.exports = app;
