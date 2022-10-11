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
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/articles/json", pagesController.showJson);

publicRouter.get("/articles/:id", articleController.show);

publicRouter.get("/register", loggedUserRedirect, userController.show);

publicRouter.post("/register", userController.create);

publicRouter.post("/articles/:id/comment", ensureAuthenticated, commentController.create);

publicRouter.get("/login", loggedUserRedirect, userController.showLogin);

publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

publicRouter.get("/logout", userController.logout);

module.exports = publicRouter;
