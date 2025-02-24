import mongoose, { Schema, Document } from "mongoose";

export interface IAlbum extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AlbumSchema = new Schema<IAlbum>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, _id: true }
);

export const Album = mongoose.model<IAlbum>("Album", AlbumSchema);