const { Article, User } = require("../models");
const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");

async function index(req, res) {
  const articles = await Article.findAll({ include: User, order: [["id", "DESC"]] });
  res.render("home", { articles, format, spanishLocale });
}

async function indexJson(req, res) {
  const articles = await Article.findAll({ include: User });
  res.json(articles);
}

module.exports = {
  index,
  indexJson,
};
