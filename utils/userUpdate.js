import User from "../models/userModel.js";

const updateUserInDatabase = (id, updates, res) => {
  User.findByIdAndUpdate(id, updates, { new: true })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        status: "FAILED",
        message: "Error occurred updating user",
      });
    });
};

export default updateUserInDatabase;