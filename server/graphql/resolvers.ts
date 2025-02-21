import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
import { Album } from "../models/Album.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();
const secret = process.env.JWT_SECRET || "supersecret";

const resolvers = {
  Query: {
      me: async (_: any, __: any, context: any) => {
        if (!context.user) {
          throw new Error("Unauthorized");
        }
        return await User.findById(context.user.id);
      },
      getUsers: async () => {
        return await User.find().populate("albums").populate("posts");
      },
      getUser: async (_: any, { _id }: { _id: string }) => {
        return await User.findById(_id).populate("albums").populate("posts");
      },
      getPosts: async (_: any, { userId }: { userId: string }) => {
        return await Post.find({ user: userId });
      },
      getPost: async (_: any, { _id }: { _id: string }) => {
        return await Post.findById(_id).populate("user");
      },
      getAlbums: async (_: any, { userId }: { userId: string }) => {
        return await Album.find({ user: userId });
      },
      getAlbum: async (_: any, { _id }: { _id: string }) => {
        return await Album.findById(_id).populate("user");
      }
  },
  Mutation: {
    signup: async (
      _parent: any, 
      { username, email, password }: { username:string; email: string; password: string}
    ) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already in use");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        password: hashedPassword,
        albums: [],
        posts: [],
      })
      await newUser.save();

      const token = jwt.sign({ data: { _id: newUser._id } }, secret, { expiresIn: "1d" });
      return { user: newUser, token };
    },

    login: async (
      _parent: any, 
      { email, password }: {email: string; password: string}
    ) => {
      const user = (await User.findOne({ email }));
      if (!user ) {throw new Error("Invalid email")};

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {throw new Error("Invalid password")};

      const token = jwt.sign({ data: { _id: user._id } }, secret, { expiresIn: "1d" });
      return { user, token };
    },
    updateProfile: async (
      _: any,
      { email, username, profilePic, location, bio }: { email: string, username: string, profilePic: string, location: string, bio: string }, 
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user.id,
        { email, username, profilePic, location, bio },
        { new: true }
      );
      return updatedUser;
    },
    createAlbum: async (
      _: any,
      { _id, name }: { _id: string, name: string },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const newAlbum = new Album({
        _id: new mongoose.Types.ObjectId(),
        user: context.user.id,
        name,
        photos: [],
      });
      await newAlbum.save();
      await User.findByIdAndUpdate(context.user.id, { $push: { albums: newAlbum._id } });
      return newAlbum;
    },
    updateAlbum: async (
      _: any,
      { _id, name }: { _id: string, name: string },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      return await Album.findByIdAndUpdate(_id, { name }, { new: true });
    },
    createPost: async (
      _: any,
      { _id, title, body, photos }: { _id: string, title: string, body: string, photos: string[] },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const newPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: context.user.id,
        title,
        body,
        photos,
      });
      await newPost.save();
      await User.findByIdAndUpdate(context.user.id, { $push: { posts: newPost._id } });
      return newPost;
    },
    updatePost: async (
      _: any,
      { _id, title, body, photos }: { _id: string, title: string, body: string, photos: string[] },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      return await Post.findByIdAndUpdate(_id, { title, body, photos }, { new: true });
    },
  },
};

export default resolvers;