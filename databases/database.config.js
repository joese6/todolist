// Configuration
import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "postgres",
  "postgres",
  "todo_list2023",
  {
    host: "db.bbnkourtxuassqgqsxrj.supabase.co",
    dialect: "postgres",
  }
);
