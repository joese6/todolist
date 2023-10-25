import express from "express";
import bodyParser from "body-parser";
import { taskController } from "./controller/task.controller.js";
import { createConnection } from "./databases/database.connection.js";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser());
createConnection();

// routing EJS
app.get("/", taskController.list);
app.get("/create", taskController.createPage);
app.get("/update/:id", taskController.updatePage);

// routing API
app.post("/create", taskController.create);
app.post("/update", taskController.update);
app.post("/delete/", taskController.delete);

app.listen(3000, () => {
  console.log("port 3000");
});
