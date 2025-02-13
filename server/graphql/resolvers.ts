import User from "../models/User.js";
import { IUser } from "../models/User.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/auth.js";

dotenv.config();

const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },
  Mutation: {
    signup: async (_: any, { email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already in use");

      const newUser = new User({ email, password }) as IUser;
      await newUser.save();

      const token = generateToken(newUser);
      return { user: newUser, token };
    },

    login: async (_: any, { email, password }: any) => {
      const user = (await User.findOne({ email })) as IUser | null;
      if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid password");
      }

      const token = generateToken(user);
      return { user, token };
    },
  },
};

export default resolvers;