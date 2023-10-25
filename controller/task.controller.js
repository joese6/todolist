import Task from "../models/task.js";
import { ejsFormatDatetime } from "../utils/ejsFormatDatetime.js";
import { validateRequired } from "../utils/validators.js";
// const tasks = [
//   {
//     name: "Belajar NodeJs",
//     description: "bla..",
//     status: "Doing",
//   },
//   {
//     name: "Belajar React",
//     description: "bla..",
//     status: "Done",
//   },
//   {
//     name: "Belajar Bootstrap",
//     description: "bla..",
//     status: "Todo",
//   },
// ];
export const taskController = {
  // filter data dan menampilkan semua data
  list: async (req, res) => {
    if (req.query.status == "All") {
      req.query.status = null;
    }
    const tasks = await Task.findAll({
      where: req.query.status && {
        status: req.query.status,
      },
    });
    res.render("pages/index", { tasks });
  },

  // membuat halaman todo
  createPage: (req, res) => {
    res.render("pages/task-form", { title: "Create Task" });
  },

  // membuat halaman update dan menampilkan data yang sudah tersimpan dari database ke form
  updatePage: async (req, res) => {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (task.dataValues.deadline) {
      task.dataValues.deadline = ejsFormatDatetime(task.dataValues.deadline);
    }
    res.render("pages/task-form", { title: "Update Task", task });
  },

  // aktivitas mengubah data / tombol submit di klik
  update: async (req, res) => {
    const isValidName = validateRequired(req, "name");
    const isValidStatus = validateRequired(req, "status");

    if (isValidName || isValidStatus) {
      return res.status(400).send({
        message: `${isValidName || isValidStatus} tidak boleh kosong`,
      });
    }
    // Create Data
    await Task.update(
      {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        deadline: req.body.deadline || null,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.redirect("/");
  },

  // menghapus data
  delete: async (req, res) => {
    const task = await Task.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.redirect("/");
  },

  // altivitas menyimpan todo baru
  create: async (req, res) => {
    const isValidName = validateRequired(req, "name");
    const isValidStatus = validateRequired(req, "status");

    if (isValidName || isValidStatus) {
      return res.status(400).send({
        message: `${isValidName || isValidStatus} tidak boleh kosong`,
      });
    }
    // Create Data
    await Task.create({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      deadline: req.body.deadline || null,
    }).catch((error) => {
      console.error("Failed to create a new record : ", error);
    });

    res.redirect("/");
    // res.send({data:req.body});
  },
};
