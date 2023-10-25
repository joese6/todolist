// Configuration
import Sequelize from "sequelize";

export const sequelize = new Sequelize("todo_list", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
