const express = require("express");
const publicRouter = express.Router();
const passport = require("passport");

// Controllers------------------------------------------
const articleController = require("../controllers/articleController");
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

// Middlewares-------------------------------------------
const loggedUserRedirect = require("../middlewares/loggedUserRedirect");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Rutas Públicas:
publicRouter.get("/", pagesController.index);

publicRouter.get("/articles/json", pagesController.indexJson);

publicRouter.get("/articles/:id", articleController.show);

publicRouter.get("/register", loggedUserRedirect, userController.create);

publicRouter.post("/register", userController.store);

publicRouter.post("/articles/:id/comment", ensureAuthenticated, commentController.store);

publicRouter.get("/login", loggedUserRedirect, userController.login);

publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

publicRouter.get("/logout", userController.logout);

module.exports = publicRouter;
