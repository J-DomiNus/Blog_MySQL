const { Article, User, Comment } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }
  await Comment.create({
    content: req.body.content,
    userId: req.user.id,
    articleId: req.params.id,
  });

  //Falta que el id del usuario quede en el articulo...
  res.redirect(`/articles/${req.params.id}`);
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

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
};
