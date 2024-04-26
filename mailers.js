import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import * as dotenv from "dotenv";
dotenv.config();
import nodeMailer from "nodemailer";
import UserVerification from "./models/authModels/verificationModel.js";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("ready for messages");
    console.log(success);
  }
});

export const sendVerificationEmail = async ({ _id, email }, res) => {
  const currentUrl = "http://localhost:3000/";

  const uniqueString = uuidv4();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email to complete the signip and login into your account.</p><p>This link <b>Expires in 10 minutes</b>Click<a href=${
      currentUrl + "api/auth/verify/" + _id + "/" + uniqueString
    }>here</a></p>`,
  };

  const salt = 10;
  bcrypt.hash(uniqueString, salt).then((hashedUniqueString) => {
    UserVerification.create({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    })
      .then(() => {
        transporter
          .sendMail(mailOptions)
          .then(() => {
            res.status(200).json({
              status: "PENDING",
              message: "Verification data saved successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: "Failed",
              message: "Email verification failed",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "Failed",
          message: "Could not save verification data",
        });
      });
  });
};
