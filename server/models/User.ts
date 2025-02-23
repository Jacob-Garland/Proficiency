import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  location?: string;
  bio?: string;
  createdAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
  _id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  location: { type: String, default: "" },
  bio: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
}, {timestamps: true});

// Hashing password before saving to database on sign-up
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password entered by user with hashed password in database on login
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
