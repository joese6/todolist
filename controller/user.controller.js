import User from "../models/user.js";
import { validateRequired } from "../utils/validators.js";
import bcrypt from "bcrypt";

export const userController = {
  list: async (req, res) => {
    const users = await User.findAll();

    res.render("pages/user-list", { users, query: req.query });
  },

  createPage: (req, res) => {
    res.render("pages/user-form", { title: "Create User" });
  },

  create: async (req, res) => {
    const isValidName = validateRequired(req, "name");
    const isValidEmail = validateRequired(req, "email");

    if (isValidName || isValidEmail) {
      return res.status(400).send({
        message: `${isValidName || isValidEmail} tidak boleh kosong`,
      });
    }

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    res.redirect("/users");
  },

  updatePage: async (req, res) => {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    delete user.dataValues.password;

    res.render("pages/user-form", { title: "Update User", user });
  },

  update: async (req, res) => {
    const isValidName = validateRequired(req, "name");
    const isValidEmail = validateRequired(req, "email");

    if (isValidName || isValidEmail) {
      return res.status(400).send({
        message: `${isValidName || isValidEmail} tidak boleh kosong`,
      });
    }

    const updateUser = {
      name: req.body.name,
      email: req.body.email,
    };

    let updateUserPassword;

    if (req.body.password) {
      updateUserPassword = {
        password: await bcrypt.hash(req.body.password, 10),
      };
    }

    User.update(
      {
        ...updateUser,
        ...updateUserPassword,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.redirect("/users");
  },

  delete: async (req, res) => {
    await User.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.redirect("/users");
  },
};
