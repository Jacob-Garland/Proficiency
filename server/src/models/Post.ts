import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  content: string;
  images?: string[];
  createdAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, _id: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);