import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.get("/", (req, res) => {
  res.send("Server is started");
});

connect(); // MongoDB'ye bağlanmayı burada çağırın

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
