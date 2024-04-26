import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();


const connectDB = async() => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB connected");
  } catch(error) {
    console.log("Database could not connect:", error)
  }
}


export default connectDB;