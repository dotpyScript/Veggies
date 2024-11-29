// 404 Error

// 404 Handler
module.exports = (req, res, next) => {
  res.status(404).render("error-404", {
    title: "Page Not Found",
    message: "The page you are looking for does not exist.",
  });
};

// Error Handling Middleware
module.exports = (err, req, res, next) => {
  if (err.status === 401) {
    return res.status(401).render("error-401", { title: "Unauthorized" });
  }
};

// 500 Error
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error-500", {
    title: "Server Error",
    message: "Something went wrong on our end.",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};
