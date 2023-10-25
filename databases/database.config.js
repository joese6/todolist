// Configuration
import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "todo_list2023",
  "todo_list2023",
  "todo_list2023",
  {
    host: "db4free.net",
    dialect: "mysql",
  }
);
