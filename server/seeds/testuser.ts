import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import connectDB from "../config/database";
import { connect } from "http2";

dotenv.config();

async function seedDatabase() {
  await connectDB();

  console.log("Connected to MongoDB");

  // await User.deleteMany(); // Clears existing users

  const hashedPassword = await bcrypt.hash("testpassword", 10);
  await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: hashedPassword,
  });

  console.log("Seed data added!");
  mongoose.connection.close();
}

seedDatabase().catch(err => console.error(err));
