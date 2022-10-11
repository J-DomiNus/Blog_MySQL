function loggedUserRedirect(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    next();
  }
}

module.exports = loggedUserRedirect;
