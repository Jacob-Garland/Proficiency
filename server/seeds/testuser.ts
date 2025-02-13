import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import connectDB from "../config/database.js";

dotenv.config();

async function seedDatabase() {
  await connectDB();

  console.log("Connected to MongoDB");

  // await User.deleteMany(); // WARNING: Clears all existing users

  const existingUser = await User.findOne({ email: "testuser@example.com" });
  
  if (existingUser) {
    console.log("Seed User already exists!");
    mongoose.connection.close();
    return;
  } else {
  const hashedPassword = await bcrypt.hash("testpassword", 10);
  await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: hashedPassword,
  });
  console.log("Seed data added!");
  mongoose.connection.close();
  }
}

seedDatabase().catch(err => console.error(err));
