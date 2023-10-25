import express from "express";
import bodyParser from "body-parser";
import { taskController } from "./controller/task.controller.js";
import { createConnection } from "./databases/database.connection.js";
import { indexController } from "./controller/index.controller.js";
import { authController } from "./controller/auth.controller.js";
import session from "express-session";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();

app.use(session({ secret: "todo_list" }));
app.set("view engine", "ejs");
app.use(bodyParser());
createConnection();

// Routing EJS
app.get("/", indexController.index);
app.get("/login", authController.loginPage);
app.post("/login", authController.login);
app.get("/logout", authController.logout);

// autorisasi
app.use(authMiddleware);

// routing Tasks
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
