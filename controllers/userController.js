const { User, Role, Article } = require("../models");
const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");

// Display a listing of the resource.

async function index(req, res) {
  const users = await User.findAll({ include: Role });
  res.render("users", { users, format, spanishLocale });
}

// Display the specified resource.
async function show(req, res) {
  const userName = req.flash("user");
  const roles = await Role.findAll();
  res.render("register", { userName, roles });
}

async function showLogin(req, res) {
  res.render("login");
}

// Show the form for creating a new resource
async function create(req, res) {
  const userAuthentication = await User.findOne({
    where: { email: req.body.email },
  });
  if (!userAuthentication) {
    console.log("estoy en userControlleer.create ", req.body.role);
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.role,
    });

    if (newUser) {
      req.login(newUser, () => {
        res.redirect("/");
      });
    }
  } else {
    req.flash("user", "Este usuario ya existe.");
    res.redirect("back");
  }
}

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const userArticles = await Article.findAll({ where: { userId: req.params.id } });
  console.log(userArticles);
  await Article.destroy({ where: { userId: req.params.id } });
  await User.destroy({
    where: { id: req.params.id },
  });
  await res.redirect("/admin");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  showLogin,
  logout,
};
