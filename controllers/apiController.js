const { Article, User, Comment, Role } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Display a listing of the resource.
async function index(req, res) {
  if (req.params.filter === "author") {
    const userArticles = await Article.findAll({ where: { userId: req.params.key } });
    return res.json(userArticles);
  }
  if (req.params.filter === "title-contains") {
    const articles = await Article.findAll({
      where: { title: { [Op.like]: `%${req.params.key}%` } },
    });
    return res.json(articles);
  }
  const articles = await Article.findAll({ include: User });
  res.json(articles);
}

// Token request
async function token(req, res) {
  const user = await User.findOne({ where: { email: req.body.email }, include: Role });
  if (user.role.type === "admin") {
    if (user.email !== req.body.email) {
      return res.json("Email invalido");
    }
    // Chequeo de hash
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
      return res.json("Password invalido");
    }
    //   Otorgar token, el stringsecreto se almacena en .env
    const token = jwt.sign({ email: user.password }, process.env.DB_DATABASE);
    user.token = token;
    return res.json({
      token,
    });
  }

  return res.json("Necesitas permisos de administrador");
}
// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [User, Comment] });
  res.json(article);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  await Article.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    image: req.body.image,
  });
  res.json("The article was succesfully created");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  await Article.update(
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );
  res.json("The article was succesfully updated");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({
    where: { id: req.params.id },
  });
  res.send("Articulo borrado");
}

// Otros handlers...
// ...

module.exports = {
  index,
  token,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
