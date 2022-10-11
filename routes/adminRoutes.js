const express = require("express");
const adminRouter = express.Router();
const pagesControllers = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const atLeastWriter = require("../middlewares/atLeastWriter");
const atLeastAdmin = require("../middlewares/atLeastAdmin");
const atLeastEditor = require("../middlewares/atLeastEditor");
// Rutas del Admin:
// ...
adminRouter.use(ensureAuthenticated);
adminRouter.get("/", atLeastEditor, pagesControllers.showAdmin);

adminRouter.get("/edit/:id", articleController.editArticle);

adminRouter.get("/destroy/:id", atLeastAdmin, articleController.destroy);

adminRouter.get("/destroyMyArticle/:id", atLeastWriter, articleController.destroy);

adminRouter.post("/articles/crear", articleController.create);

adminRouter.post("/edit/:id", articleController.edit);

adminRouter.get("/articles/crear", articleController.createArticle);

adminRouter.get("/userProfile", atLeastWriter, articleController.showUserArticles);

adminRouter.get("/destroyUser/:id", atLeastAdmin, userController.destroy);

adminRouter.get("/users", atLeastAdmin, userController.index);

module.exports = adminRouter;
