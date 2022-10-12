const { User, Role, Article } = require("../models");
const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");

// Display a listing of the resource.

async function index(req, res) {
  const users = await User.findAll({ include: Role });
  res.render("users", { users, format, spanishLocale });
}

// Show the form for creating a new resource

async function create(req, res) {
  const userName = req.flash("user");
  const roles = await Role.findAll();
  res.render("register", { userName, roles });
}

// Store a newly created resource in storage.

async function store(req, res) {
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

// Display login page

async function login(req, res) {
  res.render("login");
}

// Ends user session

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  index,
  create,
  store,
  destroy,
  login,
  logout,
};
