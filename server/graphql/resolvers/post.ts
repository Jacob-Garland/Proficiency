import { AuthenticationError } from "apollo-server-express";
import { Post } from "../../models/Post.js";
import { User } from "../../models/User.js";

const postResolvers = {
  Query: {
    // Fetch a single post by ID
    getPost: async (_: any, { id }: any) => {
      return await Post.findById(id).populate("author");
    },

    // Fetch all posts from a user
    getUserPosts: async (_: any, { userId }: any) => {
      return await Post.find({ author: userId }).populate("author");
    },
  },

  Mutation: {
    // Create a new post
    createPost: async (_: any, { title, content, images }: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const newPost = new Post({
        user: user.id,
        title,
        content,
        images,
        createdAt: new Date().toISOString(),
      });

      await newPost.save();
      await User.findByIdAndUpdate(user.id, { $push: { posts: newPost.id } });

      return newPost;
    },

    // Delete a post
    deletePost: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const post = await Post.findById(id);
      if (!post) throw new Error("Post not found");

      if (post.user.toString() !== user.id) {
        throw new AuthenticationError("You are not authorized to delete this post");
      }

      await Post.findByIdAndDelete(id);
      await User.findByIdAndUpdate(user.id, { $pull: { posts: id } });

      return true;
    },
  },
};

export default postResolvers;