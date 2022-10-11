const { Article, User, Role } = require("../models");
const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");
const ROLE = require("../constants");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: User, order: [["id", "DESC"]] });
  res.render("home", { articles });
}

async function showJson(req, res) {
  const articles = await Article.findAll({ include: User });
  res.json(articles);
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function showAdmin(req, res) {
  const articles = await Article.findAll({ include: User, Role, order: [["id", "DESC"]] });
  const role = ROLE.ADMIN;
  res.render("admin", { articles, role, format, spanishLocale });
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showJson,
  showContact,
  showAboutUs,
  showAdmin,
};
