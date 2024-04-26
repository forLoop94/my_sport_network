import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import { useCors } from "./utils/cors.js";
import authRouter from "./routes/api/authRouter.js";
import userRouter from "./routes/api/userRouter.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
})

app.use(cors(useCors()));
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);