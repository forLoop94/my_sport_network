import User from "../../models/userModel.js";



export const registerUser = (req, res) => {
  const { name, email, password, interest } = req.body;

  User.findOne({ email }).then((result) => {
    if (result) {
      res.status(409).json({
        status: "Conflict",
        message: "User already exists"
      })
    } else {
      User.create({
        name,
        email,
        password,
        interest
      }).then(result => {
        res.status(201).json(result)
      }).catch(err => {
        console.log(err)
        res.status(500).json({
          status: "FAILED",
          message: "Error occured creating user"
        })
      });
    }
  }).catch(err => {
    console.log(err);
    res.json({
      status: "Failed",
      message: "Error confirming if user exists"
    })
  });
};