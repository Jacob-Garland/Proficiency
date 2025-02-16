import { User } from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const secret = process.env.JWT_SECRET || "supersecret";

const resolvers = {
  Query: {
      profile: async (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      return await User.findById(context.user.id);
    },
  },
  Mutation: {
    signup: async (
      _parent: any, 
      { username, email, password }: { username:string; email: string; password: string}
    ) => {
      const existingUser = await User.findOne({ email, username });
      if (existingUser) throw new Error("Email already in use");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });

      const token = jwt.sign({ data: { _id: newUser._id } }, secret, { expiresIn: "1d" });
      return { user: newUser, token };
    },

    login: async (
      _parent: any, 
      { email, password }: {email: string; password: string}
    ) => {
      const user = (await User.findOne({ email }));
      if (!user ) {throw new Error("Invalid email or password")};

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {throw new Error("Invalid email or password")};

      const token = jwt.sign({ data: { _id: user._id } }, secret, { expiresIn: "1d" });
      return { user, token };
    },
    updateProfile: async (
      _: any,
      { email }: { email: string }, 
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user.id,
        { email },
        { new: true }
      );
      return updatedUser;
    },
  },
};

export default resolvers;