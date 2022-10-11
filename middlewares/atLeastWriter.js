const ROLE = require("../constants");

function atLeastWriter(req, res, next) {
//   console.log("--------------------------------");
//   console.log(req.user.role.code);
//   console.log(ROLE.WRITER);
//   console.log("--------------------------------");
  if (req.user.role.code < ROLE.WRITER) {
    res.redirect("back");
  } else {
    return next();
  }
}

module.exports = atLeastWriter;
