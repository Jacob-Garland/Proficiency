import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  body: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true, _id: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);