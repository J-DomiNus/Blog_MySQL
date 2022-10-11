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
adminRouter.get("/", atLeastEditor, articleController.index);

adminRouter.get("/users", atLeastAdmin, userController.index);

adminRouter.get("/userProfile", atLeastWriter, articleController.indexUserArticles);

adminRouter.get("/articles/crear", articleController.create);

adminRouter.post("/articles/crear", articleController.store);

adminRouter.get("/edit/:id", articleController.edit);

adminRouter.post("/edit/:id", articleController.update);

adminRouter.get("/destroy/:id", atLeastAdmin, articleController.destroy);

adminRouter.get("/destroyMyArticle/:id", atLeastWriter, articleController.destroy);

adminRouter.get("/destroyUser/:id", atLeastAdmin, userController.destroy);

module.exports = adminRouter;
