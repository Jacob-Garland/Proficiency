import mongoose, { Schema, Document } from "mongoose";

export interface IAlbum extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  photos: string[];
  createdAt: Date;
}

const AlbumSchema = new Schema<IAlbum>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export const Album = mongoose.model<IAlbum>("Album", AlbumSchema);