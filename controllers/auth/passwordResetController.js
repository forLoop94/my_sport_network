import bcrypt from "bcryptjs/dist/bcrypt.js";
import { sendResetEmail } from "../../mailers.js";
import PasswordReset from "../../models/authModels/passwordResetModel.js";
import User from "../../models/userModel.js";

export const forgotPassword = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((result) => {
      const redirectUrl = "http://localhost:5173/forgotpassword/";
      if (result) {
        sendResetEmail(result, redirectUrl, res);
      } else {
        res.json({
          status: "Failed",
          message: "User not found!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "Failed",
        message: "Error fetching user",
      });
    });
};

export const resetPassword = (req, res) => {
  const { userId, resetString, newPassword } = req.body;
  PasswordReset.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hashedResetString = result[0].resetString;

        if (expiresAt < Date.now()) {
          PasswordReset.deleteOne({ userId })
            .then(() => {
              res.json({
                status: "FAILED",
                message: "Password reset link expired",
              });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "Clearing password reset record failed",
              });
            });
        } else {
          bcrypt
            .compare(resetString, hashedResetString)
            .then((result) => {
              if (result) {
                const salt = 10;
                bcrypt
                  .hash(newPassword, salt)
                  .then((hashedPassword) => {
                    User.updateOne(
                      { _id: userId },
                      { password: hashedPassword }
                    )
                      .then(() => {
                        PasswordReset.deleteOne({ userId })
                          .then(() => {
                            res.json({
                              status: "SUCCESS",
                              message: "Password reset successful!",
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            res.json({
                              status: "FAILED",
                              message: "Clearing password reset data failed",
                            });
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                        res.json({
                          status: "FAILED",
                          message: "Updating user password failed",
                        });
                      });
                  })
                  .catch((err) => {
                    res.json({
                      status: "FAILED",
                      message: "Error occured while hashing new password",
                    });
                  });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password reset details passed",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "FAILED",
                message: "Comparing password reset strings failed",
              });
            });
        }
      } else {
        res.json({
          status: "FAILED",
          message: "Password reset request not found",
        });
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.json({
        status: "FAILED",
        message: "Checking for existing password reset record failed!",
      });
    });
};
