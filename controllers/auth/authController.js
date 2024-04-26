import User from "../../models/userModel.js";
import { generateAccessToken } from "../../utils/generateToken.js";

export const registerUser = (req, res) => {
  const { name, email, password, interest } = req.body;

  User.findOne({ email })
    .then((result) => {
      if (result) {
        res.status(409).json({
          status: "Conflict",
          message: "User already exists",
        });
      } else {
        User.create({
          name,
          email,
          password,
          interest,
        })
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              status: "FAILED",
              message: "Error occured creating user",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "Failed",
        message: "Error confirming if user exists",
      });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        user
          .matchPassword(password)
          .then((isMatch) => {
            if (isMatch) {
              res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                interest: user.interest,
                image: user.image,
                token: generateAccessToken(user._id),
              });
            } else {
              res.status(403).json({
                status: "FAILED",
                message: "Invalid email or password",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              status: "FAILED",
              message: "Something went wrong",
            });
          });
      } else {
        res.status(400).json({
          status: "FAILED",
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: "FAILED",
        message: "Something went wrong",
      });
    });
};
