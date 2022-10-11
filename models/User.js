const bcrypt = require("bcryptjs");

module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const passwordHash = await bcrypt.hash(user.password, 10);
          user.password = passwordHash;
        },
        beforeBulkCreate: async (users) => {
          for (let user of users) {
            const passwordHash = await bcrypt.hash(user.password, 10);
            user.password = passwordHash;
          }
        },
      },
      sequelize,
      modelName: "user",
    },
  );

  return User;
};
