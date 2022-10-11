const ROLE = require("../constants");

function atLeastReader(req, res, next) {
  if (req.user.role.code < ROLE.READER) {
    res.redirect("/login");
  } else {
    return next();
  }
}

module.exports = atLeastReader;
