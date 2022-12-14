const { DATEONLY, DATE } = require("sequelize");

module.exports = (sequelize, Model, DataTypes) => {
  class Article extends Model {}

  Article.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DATEONLY,
      },
      updatedAt: {
        type: DATE,
      },
    },
    {
      sequelize,
      modelName: "article",
    },
  );

  return Article;
};
