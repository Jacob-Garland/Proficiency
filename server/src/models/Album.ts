import mongoose, { Schema, Document } from "mongoose";

export interface IAlbum extends Document {
  title: string;
  user: mongoose.Types.ObjectId;
  images: string[];
  createdAt: Date;
}

const AlbumSchema = new Schema<IAlbum>(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, _id: true }
);

export const Album = mongoose.model<IAlbum>("Album", AlbumSchema);