const { DATEONLY, DATE } = require("sequelize");

module.exports = (sequelize, Model, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
      },
      title: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "comment",
    },
  );

  return Comment;
};
