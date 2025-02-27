import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { User } from "../../models/User.js";
import { Post } from "../../models/Post.js";
import config from "../../config/index.js";

const userResolvers = {
  Query: {
    // Fetch currently authenticated user
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return await User.findById(user.id).populate("posts");
    },

    // Fetch current user by ID
    getUserProfile: async (_: any, __: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return await User.findById(user.id).populate("posts");
    },

    // Fetch another user by ID
    getUserById: async (_: any, { id }: any) => {
      return await User.findById(id).populate("posts");
    },
  },

  Mutation: {
    // Register new user
    signup: async (_: any, { username, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new UserInputError("Email is already taken");

      const hashedPassword = await bcrypt.hash(password, 10);
      const userCount = await User.countDocuments();
      const newUser = new User({
        id: userCount + 1, // Assign incremental user ID
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser.id, email }, config.JWT_SECRET, { expiresIn: "7d" });

      return { token, user: newUser };
    },

    // Login user
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("Invalid credentials");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new AuthenticationError("Invalid credentials");

      const token = jwt.sign({ id: user.id, email }, config.JWT_SECRET, { expiresIn: "7d" });

      return { token, user };
    },

    // Update user profile
    updateUserProfile: async (_: any, args: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const updatedUser = await User.findByIdAndUpdate(user.id, args, { new: true });
      return updatedUser;
    },
  },
};

export default userResolvers;