import dotenv from "dotenv";
import { User } from "../models/User.js";
import connectDB from "../config/database.js";

dotenv.config();

async function seedDatabase() {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    await User.deleteMany(); // WARNING: Clears all existing users
    console.log("Cleared users collection");

    const adminUser = new User({
      id: 1,
      username: "admin",
      email: "admin@example.com",
      password: "password123",
    });

    await adminUser.save();
    console.log("Admin user seeded: admin@example.com / password123");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}


seedDatabase();
