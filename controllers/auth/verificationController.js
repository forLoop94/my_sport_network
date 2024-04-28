import bcryptjs from "bcryptjs";
import UserVerification from "../../models/authModels/verificationModel.js";
import User from "../../models/userModel.js";

export const verifyUser = (req, res) => {
  const { userId, uniqueString } = req.params;

  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;

        if (expiresAt < Date.now()) {
          UserVerification.deleteOne({ userId })
            .then(() => {
              User.deleteOne({ _id: userId })
                .then(() => {
                  res.send("Linked has expired. Please sign up again");
                })
                .catch((err) => {
                  console.log(err);
                  res.send("Clearing user with expired unique string failed");
                });
            })
            .catch((err) => {
              console.log(err);
              res.send(
                "Error occured while clearing expired user verification data"
              );
            });
        } else {
          bcryptjs
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                User.updateOne({ _id: userId }, { isVerified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.send("User verified successfully");
                      })
                      .catch((err) => {
                        console.log(err);
                        res.send("Error occured finalizing verification");
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.send(
                      "Error occured modifying user record to show modify"
                    );
                  });
              } else {
                res.send(
                  "Invalid verification details passed. Check your inbox"
                );
              }
            })
            .catch((err) => {
              console.log(err);
              res.send("Error occured while comparing unique strings");
            });
        }
      } else {
        res.send(
          "Account record does not exist or has been verified already. Please signup or login again"
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("You could not be verified");
    });
};