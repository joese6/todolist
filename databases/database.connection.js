import { sequelize } from "./database.config.js";
import Task from "../models/task.js";


// Create Connection
export const createConnection=()=>sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
//  Model
Task;

sequelize.sync().then(()=>{
  console.log('tabel sync succesfully');
}).catch((error)=>{
  console.log('Unable sync table');
});

