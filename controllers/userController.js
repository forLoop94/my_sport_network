import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import updateUserInDatabase from "../utils/userUpdate.js";

export const getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        status: "FAILED",
        message: "User not found",
      });
    });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const updates = req.body;

  if (password) {
    const salt = 10;
    bcrypt
      .hash(password, salt)
      .then((hashedPassword) => {
        updates.password = hashedPassword;
        updateUserInDatabase(id, updates, res);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "Error occured while hashing new password",
        });
      });
  } else {
    updateUserInDatabase(id, updates, res);
  };
};

