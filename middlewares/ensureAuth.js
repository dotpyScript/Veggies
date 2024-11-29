module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // Proceed to the next middleware or route handler
    }
    res.redirect("/login?status=failure"); // Redirect to login if not authenticated
  },

  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/index"); // Redirect to dashboard if already logged in
    }
    next();
  },
};
