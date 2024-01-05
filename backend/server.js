import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mainRoute from "./routes/index.js"

dotenv.config();

const app = express();
const port = 8080;

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {});
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1); // Uygulamayı durdur
  }
};


app.use("/api",mainRoute)

connect(); // MongoDB'ye bağlanmayı burada çağırın

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
