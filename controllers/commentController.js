const { Comment } = require("../models");

async function store(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }
  await Comment.create({
    content: req.body.content,
    userId: req.user.id,
    articleId: req.params.id,
  });
  res.redirect(`/articles/${req.params.id}`);
}

module.exports = {
  store,
};
