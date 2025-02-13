import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const resolvers = {
  Query: {
    async getUser(_: any, { id }: { id: string }) {
      return await User.findById(id);
    },
  },

  Mutation: {
    async register(_: any, { username, email, password }: { username: string; email: string; password: string }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

      return { token, user };
    },

    async login(_: any, { email, password }: { email: string; password: string }) {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Authentication Failed: User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Authentication Failed: Invalid password");

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

      return { token, user };
    },
  },
};

export default resolvers;