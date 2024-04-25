import express from "express";
import connectDB from "./db.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
})
