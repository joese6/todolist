// Create Model
import { DataTypes } from "sequelize";
import { sequelize } from "../databases/database.config.js";

export const Task = sequelize.define("tasks", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
  },
});

export default Task;
