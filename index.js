import express from "express";
import bodyParser from "body-parser";
import { taskController } from "./controller/task.controller.js";
import { createConnection } from "./databases/database.connection.js";
import { indexController } from "./controller/index.controller.js";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser());
createConnection();

// index
app.get("/", indexController.index);

// routing Tasks
// routing EJS
app.get("/tasks", taskController.list);
app.get("/tasks/create", taskController.createPage);
app.get("/tasks/update/:id", taskController.updatePage);

// routing API
app.post("/tasks/create", taskController.create);
app.post("/tasks/update", taskController.update);
app.post("/tasks/delete/", taskController.delete);

app.listen(3000, () => {
  console.log("port 3000");
});
