const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const apiRoutes = require("./apiRoutes");
const makeUserAvailable = require("../middlewares/makeUserAvailable");

module.exports = (app) => {
  app.use(makeUserAvailable);

  app.use(publicRoutes);
  app.use("/admin", adminRoutes);

  app.use("/api", apiRoutes);
};
