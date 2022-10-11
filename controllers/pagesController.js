const { Article, User } = require("../models");

async function index(req, res) {
  const articles = await Article.findAll({ include: User, order: [["id", "DESC"]] });
  res.render("home", { articles });
}

async function indexJson(req, res) {
  const articles = await Article.findAll({ include: User });
  res.json(articles);
}

module.exports = {
  index,
  indexJson,
};
