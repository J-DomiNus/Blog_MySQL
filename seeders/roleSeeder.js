const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const roles = [];

  for (let i = 0; i < 4; i++) {
    const arrayOfTypes = ["reader", "writer", "editor", "admin"];
    const arrayOfCodes = [10, 20, 30, 40];

    roles.push({
      type: arrayOfTypes[i],
      code: arrayOfCodes[i],
    });
  }

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
