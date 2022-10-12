const { Article, User, Comment, Role } = require("../models");
const formidable = require("formidable");
const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");
const ROLE = require("../constants");

// Display a listing of the resource.

async function index(req, res) {
  const articles = await Article.findAll({ include: User, Role, order: [["id", "DESC"]] });
  const role = ROLE.ADMIN;
  res.render("admin", { articles, role, format, spanishLocale });
}

async function indexUserArticles(req, res) {
  const userArticles = await Article.findAll({ where: { userId: req.user.id }, include: User });
  res.render("userProfile", { userArticles, format, spanishLocale });
}

// Display the specified resource.

async function show(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [User, Comment] });

  const comments = await Comment.findAll({
    where: { articleId: req.params.id },
    order: [["id", "DESC"]],
    include: User,
  });
  res.render("article", {
    article,
    comments,
    format,
    spanishLocale,
  });
}

// Show the form for creating a new resource

async function create(req, res) {
  return res.render("createArticle");
}

// Store a newly created resource in storage.

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.title,
      content: fields.content,
      userId: req.user.id,
      image: files.image.newFilename,
    });
  });
  if (req.user.role.code <= ROLE.WRITER) {
    return await res.redirect("/admin/userProfile");
  }
  return await res.redirect("/admin");
}

// Show the form for editing the specified resource.

async function edit(req, res) {
  const article = await Article.findByPk(req.params.id, { include: "user" });

  res.render("editArticle", {
    article,
  });
}

// Update the specified resource in storage.

async function update(req, res) {
  await Article.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );
  if (req.user.role.code <= ROLE.WRITER) {
    return await res.redirect("/admin/userProfile");
  }
  res.redirect("/admin");
}

// Remove the specified resource from storage.

async function destroy(req, res) {
  await Article.destroy({
    where: { id: req.params.id },
  });
  if (req.user.role.code <= ROLE.WRITER) {
    return await res.redirect("/admin/userProfile");
  }
  res.redirect("/admin");
}

module.exports = {
  index,
  indexUserArticles,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
