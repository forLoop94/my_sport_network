import { sendResetEmail } from "../../mailers.js";
import User from "../../models/userModel.js";

export const forgotPassword = (req, res) => {
  const { userId } = req.params;

  User.findById(userId).then((result) => {
    const redirectUrl = "http://localhost:5173/forgotpassword/";
    if(result) {
      sendResetEmail(result, redirectUrl, res)
    } else {
      res.json({
        status: "Failed",
        message: "User not found!"
      })
    }
  }).catch((err) => {
    console.log(err)
    res.json({
      status: "Failed",
      message: "Error fetching user"
    })
  })
}