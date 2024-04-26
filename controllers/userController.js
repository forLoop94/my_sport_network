import User from "../models/userModel.js";

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
  const updates = req.body;

  User.findByIdAndUpdate(id, updates, { new: true })
    .then(() => {
      res.status(200).json(updates);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        status: "FAILED",
        message: "User not found",
      });
    });
};
