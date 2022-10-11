module.exports = (sequelize, Model, DataTypes) => {
  class Role extends Model {}

  Role.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.TINYINT,
      },
    },
    {
      sequelize,
      modelName: "role",
    },
  );

  return Role;
};
