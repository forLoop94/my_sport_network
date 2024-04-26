import User from "../models/userModel.js";

export const getAllUsers = (req, res) => {
  User.find().then((users) => {
    res.status(200).json(users);
  }).catch(err => {
    console.log(err)
  });
}