const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const { expressjwt: checkJwt } = require("express-jwt");

apiRouter.post("/tokens", apiController.token);

apiRouter.use(checkJwt({ secret: process.env.DB_DATABASE, algorithms: ["HS256"] }));

apiRouter.get("/articles", apiController.index);

apiRouter.get("/articles/:filter/:key", apiController.index);

apiRouter.get("/article/:id", apiController.show);

apiRouter.post("/articles/create", apiController.store);

apiRouter.patch("/articles/:id", apiController.update);

apiRouter.delete("/articles/:id", apiController.destroy);

module.exports = apiRouter;
