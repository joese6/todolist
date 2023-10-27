"use strict";

const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "admin";
    const passwordHashed = await bcrypt.hash(password, 10);
    return queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "ex@gmail.com",
        password: passwordHashed,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // return queryInterface.bulkDelete("Users", null, {});
  },
};
